Events = new Meteor.Collection("events");

if (Meteor.isClient) {
  Template.timeline.events = function() {
    return Events.find({});
  };

  Template.timeline.selected_event = function () {
    var ievent = Events.findOne(Session.get("selected_event"));
    return ievent;

  };

  Template.event.selected = function() {
    return Session.equals("selected_event", this._id) ? "selected" : '';
  };

  Template.event.events({
    'mouseover': function () {
      Session.set("selected_event", this._id);
    }
  });

  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}
















if (Meteor.isServer) {
  Meteor.startup(function () {

    if (Events.find().count() === 0) {
      var names = ["Event 1",
                    "Event 2",
                    "Event 3",
                    "Event 4",
                    "Event 3",
                    "Event 4",
                    "Event 3",
                    "Event 4",
                    "Event 2",
                    "Event 3",
                    "Event 4",
                    "Event 3",
                    "Event 4",
                    "Event 3",
                    "Event 4",
                    "Event 5"];
      var descriptions = ["Desc 1",
                          "Desc 2",
                          "Desc 3",
                          "Desc 4",
                          "Desc 3",
                          "Desc 4",
                          "Desc 3",
                          "Desc 4",
                          "Desc 2",
                          "Desc 3",
                          "Desc 4",
                          "Desc 3",
                          "Desc 4",
                          "Desc 3",
                          "Desc 4",
                          "Desc 5"];
      var images = ["http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/ap04050903278-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/2607780eg017_missle-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/ap04050903278-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/2607780eg017_missle-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/ap04050903278-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/2607780eg017_missle-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/ap04050903278-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/2607780eg017_missle-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/2607780eg017_missle-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/ap04050903278-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/2607780eg017_missle-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/ap04050903278-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/2607780eg017_missle-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/ap04050903278-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/09/22/iraq/assets/images/2607780eg017_missle-640.jpg",
                    "http://graphics8.nytimes.com/newsgraphics/2014/03/26/iraq/93bcd9ff2bdd36cc8238f32c43bde82e31c64d95/ai2html/ch5_map_taji_to_balad-ai2html-547.jpg"];
      var articles = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur sed dui eu molestie. Vestibulum a nibh gravida, eleifend ipsum nec, eleifend ipsum. Suspendisse ac justo ac neque pulvinar bibendum ac vitae lorem. Sed egestas orci non quam pretium lacinia. Fusce enim risus, sodales faucibus odio vel, iaculis dapibus enim. Phasellus tempus vestibulum enim in efficitur. Donec auctor risus id neque ornare, a condimentum enim vulputate. Sed hendrerit justo eu arcu sollicitudin lacinia. Fusce in facilisis magna, eu egestas leo. Sed placerat lectus arcu, non tristique arcu tristique vitae. Sed gravida diam urna, sed dictum odio egestas ut. Phasellus euismod at lectus ac tempus. Cras ultricies lacus metus, vitae euismod lectus commodo quis. Nulla ultricies lacus egestas, sodales sem sit amet, condimentum massa."];

      for (var i = 0; i < names.length; i++) {
        Events.insert({ name: names[i],
                        description: descriptions[i],
                        image: images[i],
                        article: articles[i]
        });
      }
    }
  });
}
