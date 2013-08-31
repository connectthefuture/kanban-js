(function() {
   var queues = require('../db/queuesDb');

   var Cards = function() {
      this.post = function(request, response) {
         var newCard = {
            name: request.body.name,
            description: request.body.description
         };
         queues.addCard(request.body.stateId, newCard, function() {
            response.json({ message: 'worky!' });
         });
      };
   };

   module.exports = new Cards();
})();
