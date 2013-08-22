define(['services/queueService'], function(queueService) {
   var Card = function(name) {
      var description = "blah blah blah blah blah blah blah blah blah blah blah";
      this.name = ko.observable(name);
      this.description = ko.observable(description);
   }

   var State = function(name, cards) {
      this.name = ko.observable(name);
      this.cards = ko.observableArray(cards);
   }

   var allStates = [
      new State('To do', 
         [new Card('card1'), new Card('card2'), new Card('card3'), new Card('card4')]),
      new State('Doing', 
         [new Card('card5'), new Card('card6')]),
      new State('Done', 
         [new Card('card7'), new Card('card8'), new Card('card9'), new Card('card10')])
   ];

   var Queue = function() {
      this.states = ko.observableArray(allStates);
   };

   var Home = function() {
      var self = this;
      self.queues = ko.observableArray([]);
      self.selectedQueue = ko.observable();


      self.viewAttached = function() {
         queueService.getAllQueues(function(queues) {
            self.queues(transformQueues(queues));
            if (self.queues().length > 0) {
               self.selectedQueue(self.queues()[0]);
            }
         });
      };

      var transformQueues = function(queuesJson) {
         return [];
      };

      self.selectQueue = function(queue) {
         self.selectedQueue(queue);
      };

      self.states = ko.computed(function() {
         if (self.selectedQueue()) {
            return self.selectedQueue().states();
         }
         return [];
      });
   };

   return new Home();
});
