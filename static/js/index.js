const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

const token = window.sessionStorage.getItem('token');

fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/questions", {
  method: 'GET',
  mode: 'cors', 
  redirect: 'follow',
  headers: {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
  },
  })
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    data.Questions.forEach(question => {

      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h2 = document.createElement('h2');
      h2.textContent = question.title;

      const p = document.createElement('p');
      question.body = question.body.substring(0, 300);
      p.textContent = `${question.body}...`;

      const h4 = document.createElement('h4');
      h4.textContent = "Asked By " + question.created_by;

      const viewAnswer = document.createElement('button');
      viewAnswer.setAttribute('id', 'updown')
      viewAnswer.textContent = "View Answers";
      viewAnswer.onclick = function(){
        window.sessionStorage.setItem('questionid', question.id)
        window.sessionStorage.setItem('questiontitle', question.title)
        window.sessionStorage.setItem('questionbody', question.body)
        window.sessionStorage.setItem('askedby', question.created_by)
        window.location.replace("specificquestion.html")
      }

      const answer = document.createElement('button');
      answer.setAttribute('id', 'updown');
      answer.textContent = "Answer this question";
      answer.onclick = function(){
        window.sessionStorage.setItem('questionid', question.id)
        window.sessionStorage.setItem('questiontitle', question.title)
        window.sessionStorage.setItem('questionbody', question.body)
        window.location.replace("answer.html")
      }

      container.appendChild(card);
      card.appendChild(h2);
      card.appendChild(p);
      card.appendChild(h4);
      card.appendChild(viewAnswer);
      card.appendChild(answer)

    });
  })

  

  .catch(function(error) {
    console.log(error);
  });   

