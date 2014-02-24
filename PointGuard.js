  Stuff = new Meteor.Collection('pd');
  Reports = new Meteor.Collection('reports');



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

  if (Meteor.isClient) {


    Handlebars.registerHelper('chooseColor', function(a){
      console.log(a);
      var s = parseInt(a);

      if(s > 92)
          return '#37d078';
      else if(s > 82)
          return '#1abc9c';
      else if(s > 72)
          return '#f1c40f';
      else if(s > 64)
          return '#e67e22';
      else if(s <= 63)
          return '#e74c3c';

      
    });

    Handlebars.registerHelper('pageHeight', function(){
      return $(window).height();

    });    

    Handlebars.registerHelper('addnbsp', function(x){
      var s = "";
      for(var f = 0; f < x; f++)
        s+="&nbsp;";
      return s;

    });       

    Handlebars.registerHelper('bestClass', function(){
      return Stuff.find({name:n}, {sort:{endScore: -1}});

    });       


    Template.base.emails = function () {

      return Stuff.find({}, {sort:{ timeStamp : -1 }});

    };  

    Template.base.scores = function () {

      var n = Meteor.user().username;

      return Stuff.find({name:n}, {sort:{ timeStamp : -1 }});

    };      

    Template.base.progressReports = function () {

      var n = Meteor.user().username;

      return Stuff.find({name:n}, {sort:{ timeStamp : -1 }});

    };      

    Template.base.events({
      'click input' : function () {
        // template data, if any, is available in 'this'
        if (typeof console !== 'undefined')
          console.log("You pressed the button");
      }
    });


  Accounts.ui.config({

    passwordSignupFields: 'USERNAME_AND_EMAIL'

  });


  }

  if (Meteor.isServer) {
    Meteor.startup(function () {
      // code to run on server at startup
    });

    Meteor.methods({
      getURLContent : function(url){


          return Meteor.http.get(url);
          
      },
      getS3 : function(){
        var ret = 0;
        Stuff.find({atbool:true}).forEach(function(a){
          if(a.attached == 'blank')
            {
              ret++;
              console.log('a');

              Meteor.call('getURLContent', a.data.attachments[0].url, function(e, r){

                var info = r.content;
                var finish = new Array();
                var n = null;
                var c = null;
                var t = null;
                var grades = new Array();
                var h = false;
                var endGrade = null;



                if(a.data.attachments[0].content_type == "text/html")
                {

                  var regex = /(<([^>]+)>)/gi;
                  h = true;


                  info = info.replace(regex, "---").split("---");
                  for(var x = 0; x < info.length; x++)
                    if(info[x] != false)
                      finish.push(info[x]);

                    //everything is now in an array
                    //time to make a fancy HTML output


                  n = finish[0].split(" - ")[0];
                  c = finish[3].split("Class: ")[1];
                  t = finish[1].split("Teacher: ")[1];
                  eM = finish[6];
                  eS = parseInt(finish[6].split("%")[0]);



                  for(var x = finish.indexOf("&nbsp;") - 1; x < finish.indexOf("Notes for Report"); x+= 6)
                  {
                    if(typeof finish[x+2] == "string" && !isNaN(parseInt(finish[x+3])) && !isNaN(parseInt(finish[x+4])) && !isNaN(parseInt(finish[x+5])))
                      grades.push({num : finish[x], assignment: finish[x + 2], points : finish[x+3], outOf : finish[x+4], percent : finish[x+5]});
                  }


                }





                // while(info.indexOf("") != -1)
                //   info.splice(a.indexOf(""), 1);

                console.log(a._id);
                Stuff.update({_id: a._id}, {$set:{attached : finish, name : n, course : c, scores: grades, hasGrades : h, teacher : t, grade : eM, endScore : eS}});
                //update Stuff's 'attached' field to equal info

              });
            }

        });
        return ret;
      }
    });


  }


