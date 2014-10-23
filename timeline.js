Events = new Meteor.Collection("events");

if (Meteor.isClient) {

  //Intialize App
  Meteor.startup(function () {
    //Eventline
    var eventline_width = $('#event-line').width();
    var eventline_offset_left = $('#event-line').offset().left;
    Session.set('eventline_width', eventline_width);
    Session.set('eventline_offset_left', eventline_offset_left);

    //Arrow
    var arrow_width = $('#left-arrow').width();
    Session.set('arrow_width_svg', arrow_width);

    //Init
    Session.set("selected_event", 1);
    Session.set("switch", 'up')

    //Resize listener
    $(window).resize(function() {
      Session.set("resize_listener", new Date());
    });

    //Arrow key listener
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
      var event = Events.findOne({id:Session.get("selected_event")});
      if (!event) return;
      var date_array = new Date(event.date).toDateString().split(' ');
      event.month_day = date_array[1] + ', ' + date_array[2];
      event.year = date_array[3];
      return event;
    },

    events: function() {
      return Events.find({});
    },

    switch:function() {
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
      return new Date(this.date).toDateString();
    },

    distance_pushed: function() {
      // This is used to cause function update on resize change."
      var resize_listener = Session.get("resize_listener"); 

      //Event dates
      console.log(event_dates);
      var event_dates = Events.find({}, { fields:{date:1}, sort:{date:1} });
      var first_event_date = event_dates.fetch()[0].date;
      var last_event_date = event_dates.fetch()[event_dates.count() - 1].date;
      var millisec_diff_between_events = last_event_date - first_event_date;

      //Eventline
      var eventline_width = $('#event-line').width();
      Session.set('eventline_width', eventline_width);

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
    selected_event: function() {
      return Events.findOne({id:Session.get("selected_event")});
    }
  });
 
}
















if (Meteor.isServer) {
  Meteor.startup(function () {

    if (Events.find().count() === 0) {

      var ids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

      var contents = [
                        "An 18-year-old teenager, Michael Brown, is shot and killed on Saturday by a police officer in Ferguson, Mo. The circumstances surrounding the shooting are in dispute. The police say Mr. Brown was shot during a skirmish with the officer. A friend who was walking with Mr. Brown, Dorian Johnson, says the officer opened fire when the young men refused to move from the middle of the street to the sidewalk. He says Mr. Brown’s hands were over his head when the officer fired. All agree that Mr. Brown was unarmed.",
                        "After a candlelight vigil on Sunday evening, protesters flood into the streets near the scene of the shooting, some chanting, “No justice, no peace.” They are met by police officers in riot gear, carrying rifles and shields.",
                        "Images and videos captured on cellphones begin to flood social media sites, and accounts of looting in Ferguson spread quickly on Twitter. The QuikTrip in the second tweet, below, is among the first- and hardest-hit businesses.",
                        'The Federal Bureau of Investigation opens a civil rights inquiry into the shooting of Mr. Brown on Monday as protests in Ferguson continues. The N.A.A.C.P. issues a statement of support for Mr. Brown\'s family, adding, "Even as we call for accountability by those charged with protecting the community, we call on the community to act – collectively and calmly." Jon Belmar, chief of the St. Louis County Police, asks for patience while his department completes an investigation that could take some time. That night, protesters again square off with the police, who use tear gas to disperse the crowd.',
                        "The police chief in Ferguson on Tuesday reconsiders his decision to release the name of the officer involved in the shooting, citing concerns for the officer's safety. The department says threats were made against the officer and the city’s Police Department on social media. “The value of releasing the name is far outweighed by the risk of harm to the officer and his family,” the police chief, Thomas Jackson, says. The decision draws criticism from a lawyer for the Brown family.",
                        "The selective release of information about the shooting, especially the anonymity granted to the officer, fuels a fourth day and night of protests in Ferguson that escalates after the police seeks to disperse people using rubber bullets and tear gas. Thomas Jackson, Ferguson's chief of police, reveals earlier in the day that the officer who shot Mr. Brown had been struck in the face during the encounter and treated at a hospital. The friend who was with Mr. Brown at the time of the shooting has disputed the Police Department's claim that there was a struggle. Among those arrested in the evening are Wesley Lowery of The Washington Post and Ryan J. Reilly of The Huffington Post, who are apprehended at a McDonald’s on suspicion of trespassing. They are later released without charges or an explanation. Both news organizations criticize the arrests. Also arrested is Antonio French, a St. Louis alderman who was documenting the protests on social media. Mr. French is released the next morning. A witness tweets this image of a street filling with clouds of tear gas, illuminated by what look like small explosions. Later, the police confirm that Molotov cocktails were thrown during the night.",
                        "President Obama says that Attorney General Eric H. Holder Jr. “should do what is necessary to help determine exactly what happened and to see that justice is done.” Mr. Obama — who speaks from Martha's Vineyard, Mass., where he is vacationing — also criticizes law enforcement officers in Ferguson for what he describes as excessive force during the protests. He adds that he had spoken to Gov. Jay Nixon of Missouri. “I expressed my concern over the violent turn of events,” the president says. Earlier in the day, Mr. Nixon speaks in Ferguson and promises 'operational shifts,' saying that St. Louis County police officers would be relieved of duty in Ferguson. Later, he confirms that the Missouri State Highway Patrol would begin overseeing security and crowd control during the protests.",
                        "One day after roiling tensions over the police shooting of a black teenager began to subside, emotions flare anew on Friday as the police identify the officer involved but also release evidence that the victim was a suspect in a convenience store robbery moments before being shot. The manner in which the police here release the information, which include a 19-page police report on the robbery but no new details about the shooting, leads to the spectacle of dueling police news conferences, one led by a white officer who seems ill at ease and defensive, and the other dominated by a charismatic black officer who expresses solidarity with the crowd even as he pleads for peace.",
                        "On Saturday, Gov. Jay Nixon cites looting when he declares a state of emergency and imposes a midnight-to-5 a.m. curfew on the St. Louis suburb. The announcement prompts cries of protest and anguish from some members of the public, with many of them arguing that a curfew would lead only to new and fierce confrontations. But Capt. Ronald S. Johnson, the state Highway Patrol commander whose officers have overseen public security in Ferguson since Thursday, says: “We won’t enforce it with trucks, we won’t enforce it with tear gas, we will enforce it with communication. We will be telling people, ‘It’s time to go home.’ ”",
                        "As the midnight curfew in Ferguson takes effect amid heavy rain, crowds that had filled some streets begin to disperse. But some clusters of people confront police officers lining the streets or riding in armored vehicles. The demonstrators chant: “We are Mike Brown! We have the right to assemble peacefully!” invoking the name of the 18-year-old fatally shot by the officer. Protesters toss at least one bottle rocket, according to the police, and at the apparent sound of gunshots, demonstrators scramble to safety. The police fire smoke canisters and tear gas at the crowds, and officials later say it was in response to the shooting, in which one man is critically wounded, apparently by another protester. Seven people are arrested and accused of failing to disperse. The governor of Missouri later says that the curfew was effective in helping to maintain a relative peace.",
                        "Despite the official pronunciation of a successful curfew, passions in Ferguson are hardly tamped down as the day wears on. First, word comes that officials have extended the curfew for at least one more night. Then, Attorney General Eric H. Holder Jr. announces that the Justice Department would conduct its own autopsy of Mr. Brown because of the “extraordinary circumstances” in the case. (A state autopsy has already been completed.) Later, the police, pastors and civil rights figures gather at churches, delivering passionate speeches and calls for change. Then, late in the evening, the preliminary results of a private autopsy performed on Sunday by Dr. Michael M. Baden at the request of Mr. Brown's family are revealed. (Prof. Shawn L. Parcells assists Dr. Baden.) The 18-year-old was shot at least six times, including twice in the head, the report says. All the bullets were fired into his front. One bullet entered the top of his skull, suggesting his head was bent forward when it struck him, and caused a fatal injury. \"This information could have been released on Day 1,\” Dr. Baden says in an interview after the autopsy. Amid appeals for calm, and as the second midnight curfew approaches, street violence flares again.",
                        "President Obama dispatched Attorney General Eric H. Holder Jr. to Missouri after the governor deployed the National Guard to help the police quell unrest. The governor, Jay Nixon, also lifted a curfew that had been imposed on Friday night. Mr. Holder will travel to Ferguson on Wednesday, Mr. Obama said, and Ronald Davis, the director of the Justice Department's Office of Community Oriented Policing Services, will arrive Tuesday to work with police officials. President Obama told reporters at the White House that he had talked to Mr. Nixon and expressed “an interest in making sure that if in fact the National Guard is used, it is used in a limited and appropriate way.” “I’ll be watching over the next several days, to assess whether, in fact, it’s helping rather than hindering progress in Ferguson,” Mr. Obama said. The role of the National Guard will be limited to protecting the police command center here, which the authorities said came under a coordinated attack on Sunday night, Mr. Nixon said.",
                        "The protests in Ferguson reached new levels of violence, even as the Missouri National Guard arrived, the latest in a series of quickly shifting attempts to quell the chaos. The authorities had banned stationary protests, even during the day, ordering demonstrators to continue walking — particularly in an area near where the shooting occurred. Reports of tear gas, rubber bullets and the exchange of live gunfire began to flood Twitter. In the morning Ferguson's streets were relatively quiet, but officials revealed that during the protests of the previous evening, two men were shot in the crowd, and 31 people — some from New York and California — were arrested. Six journalists were among those who were detained. Fires were reported in two places. The police were shot at, the authorities said, but did not fire their weapons.",
                        "Attorney General Eric H. Holder Jr. arrived in St. Louis to meet with community leaders and federal investigators as local law enforcement officials said they were hopeful that they had turned a corner in calming the restive community of Ferguson after 12 days of protests and unrest. A grand jury has been convened and was scheduled to begin hearing evidence, said Edward Magee, a spokesman for Robert P. McCulloch, the prosecuting attorney for St. Louis County.",
                        "Gov. Jay Nixon ordered the Missouri National Guard to begin a withdrawal from Ferguson, signaling that the authorities believed that they had largely restored order after nearly two weeks of unrest. In a statement, Mr. Nixon said the situation had “greatly improved with fewer incidents of outside agitators interfering with peaceful protesters and fewer acts of violence.” In Washington, having returned from his trip to Ferguson, Attorney General Eric H. Holder Jr. indicated that the federal effort was moving forward. “It’s going to take time for us to develop all the facts, develop all the evidence and see where the case will ultimately go,” he said. \“It’s most important that we get it right.\” ",
                        "The school year in Ferguson was scheduled to begin on Aug. 14, but the opening was delayed because of the unrest that followed the killing of Michael Brown five days earlier. Public schools will open on Monday, and teachers and administrators in the Ferguson-Florissant School District are eager to establish some sense of normalcy.",
                        "Thousands paid their respects to Michael Brown, more than two weeks after he was shot and killed by a police officer in Ferguson, Mo. In a deeply religious service at the Friendly Temple Missionary Baptist Church, several speakers exhorted mourners to work for justice, not just for Mr. Brown but for others, long after the funeral was over. The crowd of mourners included his parents and extended family, as well as the Rev. Jesse Jackson; the film director Spike Lee; T. D. Jakes, the bishop of The Potter’s House, an African-American megachurch; several members of Congress; representatives from the White House; and two children of the Rev. Dr. Martin Luther King Jr.",
                      ];
      var images = [
                    "http://graphics8.nytimes.com/images/2014/08/13/us/TIMELINE1/TIMELINE1-articleLarge.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/13/us/TIMELINE2/TIMELINE2-articleLarge.jpg",
                    "https://pbs.twimg.com/media/BuuHmJbIEAAgV7H.jpg:large",
                    "http://graphics8.nytimes.com/images/2014/08/13/us/TIMELINE3/TIMELINE3-articleLarge.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/13/us/TIMELINE4/TIMELINE4-articleLarge.jpg",
                    "https://pbs.twimg.com/media/Bu9uYRNCMAEtznX.jpg:large",
                    "http://graphics8.nytimes.com/images/2014/08/15/us/15obama2/15obama2-articleLarge.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/15/multimedia/ferguson-reax-friday/ferguson-reax-friday-articleLarge.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/16/us/20140817_MISSOURI-slide-FPW1/20140817_MISSOURI-slide-FPW1-articleLarge.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/17/us/missouri-picNEW1/missouri-picNEW1-articleLarge.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/18/us/SUB-JP-BROWN-2/SUB-JP-BROWN-2-articleLarge.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/14/multimedia/mo-governor/mo-governor-articleLarge.jpg",
                    "https://pbs.twimg.com/media/BvYYJu2CYAAh5Pv.jpg:large",
                    "https://pbs.twimg.com/media/Bvf-CjiIYAAfiV_.jpg:large",
                    "http://graphics8.nytimes.com/images/2014/08/22/us/22missouri10/22missouri10-articleLarge.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/22/us/SCHOOLS/SCHOOLS-articleLarge-v3.jpg",
                    "http://graphics8.nytimes.com/images/2014/08/25/us/26FUNERAL5/26FUNERAL5-blog533.jpg"
                    ];

      var titles = [
                      "Michael Brown Is Shot",
                      "Protests Amid Calls for Patience",
                      "A Peaceful Protest Turns Violent",
                      "F.B.I. Opens Civil Rights Investigation",
                      "Police Decline to Identify Officer",
                      "Anger Mounts Over Anonymity of Police Officer",
                      "Shift in Oversight of Crowd Control",
                      "Dueling Police Statements as Anger Rises",
                      "Governor Declares Curfew in Ferguson",
                      "Clashes Erupt as Some Protesters Ignore Curfew",
                      "Preachers, Passion and a Private Autopsy",
                      "Governor Deploys National Guard",
                      "Unrest Escalates Despite Presence of National Guard",
                      "Focus Turns to Investigation as Holder Arrives",
                      "National Guard Troops Ordered to Withdraw",
                      "Ferguson Area Schools Prepare for Opening Day",
                      "Mourning and Calls for Action at Michael Brown's Funeral",
                    ];

      var links = [
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                    "http://www.nytimes.com",
                  ];

      var dates = [
                    Date.UTC(2014, 7, 9,  0),
                    Date.UTC(2014, 7, 10, 0),
                    Date.UTC(2014, 7, 10, 12),
                    Date.UTC(2014, 7, 11, 0),
                    Date.UTC(2014, 7, 12, 0),
                    Date.UTC(2014, 7, 13, 0),
                    Date.UTC(2014, 7, 14, 0),
                    Date.UTC(2014, 7, 15, 0),
                    Date.UTC(2014, 7, 16, 0),
                    Date.UTC(2014, 7, 17, 0),
                    Date.UTC(2014, 7, 17, 12),
                    Date.UTC(2014, 7, 18, 0),
                    Date.UTC(2014, 7, 18, 12),
                    Date.UTC(2014, 7, 20, 0),
                    Date.UTC(2014, 7, 21, 0),
                    Date.UTC(2014, 7, 24, 0),
                    Date.UTC(2014, 7, 25, 0)
                  ];

      for (var i = 0; i < titles.length; i++) {
        Events.insert({ id: ids[i],
                        title: titles[i],
                        content: contents[i],
                        image: images[i],
                        link: links[i],
                        date: dates[i]
        });
      }
    }
  });
}
