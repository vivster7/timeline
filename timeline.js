Events = new Meteor.Collection("events");

if (Meteor.isClient) {

  Meteor.subscribe("events", function() {
      var event_dates = Events.find({}, { fields:{date:1}, sort:{date:1} });
      var first_event_date = event_dates.fetch()[0].date;
      var last_event_date = event_dates.fetch()[event_dates.count() - 1].date;
      var millisec_diff_between_events = last_event_date - first_event_date;

      Session.set("first_event_date", first_event_date);
      Session.set("millisec_diff_between_events", millisec_diff_between_events);
  });

  //Intialize app when DOM loaded
  Meteor.startup(function () {
    //Eventline
    var eventline_width = $('#event-line').width();
    var eventline_offset_left = $('#event-line').offset().left;
    Session.set('eventline_width', eventline_width);
    Session.set('eventline_offset_left', eventline_offset_left);

    //Arrow
    var arrow_width = $('#left-arrow').width();
    Session.set('arrow_width_svg', arrow_width);

    //Select first event, with article content "up"
    Session.set("selected_event", 1);
    Session.set("switch", 'up')

    //Resize listener
    $(window).resize(function() {
      Session.set("resize_listener", new Date());
    });

    //Arrow key listeners
    $(document).keydown(function (evt) {
      //left
      if (evt.keyCode === 37) {
        var event_id = Session.get('selected_event');
        if (event_id > 1) Session.set("selected_event", event_id - 1) 
      }

      //right
      if (evt.keyCode === 39) {
        var event_id = Session.get('selected_event');
        if (event_id < 17) Session.set("selected_event", event_id + 1)
      }
      //up
      if (evt.keyCode === 38) {
        Session.set("switch", "up");
      }

      //down
      if(evt.keyCode === 40) {
        Session.set("switch", "down");
      }

    });

  });

  //Responsive timeline
  Template.timeline.helpers({
    selected_event: function() {
      return Events.findOne( { id:Session.get("selected_event") },
                             { fields:{title:1, content:1} } );
    },

    selected_date: function() {
      var selected_event = Events.findOne( { id:Session.get("selected_event") },
                                           { fields:{date:1} } );

      if (selected_event) {
        var formatted_date_array = new Date(selected_event.date).toDateString()
        formatted_date_array = formatted_date_array.split(' ').splice(1,4);

        return selected_date = {
          month_day: formatted_date_array.slice(0,2).join(" "),
          year: formatted_date_array[2]
        };
      }
    },

    events: function() {
      return Events.find({});
    },

    switch:function() {
      $('.article-content').css('transition', 'all 1s ease');
      $('.article-content').scrollTop(0);
      return Session.get('switch')
    }
  });

  Template.timeline.events({
    'click .content': function(event) {
      switch_value = Session.equals("switch", "up") ? "down" : "up";
      Session.set("switch", switch_value);
    }
  })

  //Responsive eventline
  Template.eventline.helpers({
    eventline_width: function() {
      return Session.get('eventline_width');
    },

    arrow_width_svg: function() {
      return Session.get('arrow_width_svg');
    }
  });


  Template.eventline.events({
    'click #left-arrow': function(event) {
      var event_id = Session.get('selected_event');
      if (event_id > 1) Session.set("selected_event", event_id - 1)
    },

    'click #right-arrow': function(event) {
      var event_id = Session.get('selected_event');
      if (event_id < 17) Session.set("selected_event", event_id + 1)
    }
  });


  //Responsive events
  Template.event.helpers({
    selected: function() {
      return Session.equals("selected_event", this.id) ? "selected" : '';
    },

    formatted_date: function() {
      var formatted_date_array = new Date(this.date).toDateString().split(' ').splice(1,4);
      return formatted_date_array.join(" ");
    },

    distance_pushed: function() {
      // This is used to cause function update on resize change."
      var resize_listener = Session.get("resize_listener"); 

      var first_event_date = Session.get("first_event_date");
      var millisec_diff_between_events = Session.get("millisec_diff_between_events");

      //Eventline
      var eventline_width = $('#event-line').width();
      var eventline_offset_left = $('#event-line').offset().left;
      Session.set('eventline_width', eventline_width);
      Session.set('eventline_offset_left', eventline_offset_left);

      var millisec_to_pixel_conversion = eventline_width / millisec_diff_between_events;

      return (this.date - first_event_date) * millisec_to_pixel_conversion + Session.get('eventline_offset_left') - 11;
    }
  });

  Template.event.events({
    'click': function () {
      Session.set("selected_event", this.id);
    }
  });


  //Responsive backgrounds
  Template.style.helpers({
    background_image: function() {
      //Quickly hide content when switching events
      $('.article-content').css('transition', 'none');
      $('.article-content').removeClass('down');
      Session.set("switch", "up");

      return Events.findOne({id:Session.get("selected_event")}, { fields:{image:1} });
    }
  });
 
}
