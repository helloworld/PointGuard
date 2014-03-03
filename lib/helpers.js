/* ---------------------------------------------------- +/

## Helpers ##

Functions that need to be available both on the server and client. 

/+ ---------------------------------------------------- */

//


Meteor.Router.add({
    '/inbound':  function() {

          var post = this.request.body;
          console.log(post);
          d = Date.parse(post.headers.Date);


        if(post.attachments != undefined)     
          // var url = post.data.attachments[0].url;
          // $.get( url, function( resp ) {
          Stuff.insert({data:post, timeStamp : d, atbool : true, attached : 'blank'});
          // });
        else
          Stuff.insert({data:post, timeStamp : d, atbool : false});
        Meteor.call('getS3');
      
        return [200, "Success"];
          }
  });