import React from 'react';
import ReactDOM from 'react-dom';
import Ms from 'pretty-ms';
import './App.css';

//VARIABLES/ARRAYS
//let stringify = "";
// let charactercheck = "";
// let highlighted = "";
// let unhighlighted = "";

function Time(props) {
  console.log("timerhit0 is operating", );
  //EDIT THIS --> JUST ADDED


  // for(i=60000, i>0, i-1){
  //   let time0 = props.time;
  // }


    console.log("this is the time", props.time);

  if(props.time >= 0) {
      console.log("if statement worked");
      props.handleSubmit()
      props.resetTimer()
  }


  // if(time0 === 0) {
  //   props.handleSubmit()
  // }


  return (
    <h3
    id= "timerID"
    >
      timer: {Ms(props.time)}
    </h3>
  );
}



/*
function TimerHit0(props) {
  console.log("timerhit0 is operating");
  let time0 = props.time;
    console.log("this is the time", props.time)

  if(time0 === 0) {
    props.handleSubmit()
  }

  return(
    <div>

    </div>
  )

}
*/


function Text(props) {
  console.log("Text function is running", props.text);
  return (
    <div

    >
      <p
        id = "textpara"
      >
        {props.text}
      </p>

    </div>
  );

}

function AddNewText(props) {


  //<textarea> code partially copied from https://stackoverflow.com/questions/20833761/creating-a-large-textbox-to-get-a-paragraph-input
  return (

    <div

    >


      <textarea
        name="paragraph_text"
        cols="150"
        rows="5"

        type="text"
        value={props.newStory}
        onChange = {props.handleInputNewStory}
      >

      </textarea>




    </div>
  );
}


//______________________________________________________________________________
//START OF GAME CLASS

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //player: "",
      //time: "",

      input: "",
      story: [],

      //Timer

      //change to pos.
      time: -6000,
      start: 0,
      isOn: false,
      toDisplay: 'timer',

      charactercheck: "",
      highlighted: "",
      unhighlighted: "",

    };
    //Timer
    this.startTimer = this.startTimer.bind(this)
    //this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)


  }

  callAPI(){
    fetch('http://localhost:9000/testAPI')
      .then(res => {
        let thing = res.text()
        console.log(thing)
        return thing
      })
      .then(res => {
        let thing = JSON.parse(res);
        console.log("parsed", thing);
        return thing
      })
      .then(res => {
        console.log("setting state to", res)

        //hidden story vs shown story


        for(let i = 0; i < res.length; i++) {
          this.state.charactercheck += res[i];
          console.log("this is the charactercheck:", this.state.charactercheck);
        }

        for(let i = 0; i < this.state.charactercheck.length; i += this.state.charactercheck.length - 7){
           //console.log("adding spaces");

           //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
           this.state.highlighted = this.state.charactercheck.substring(0, i);
           this.state.unhighlighted = this.state.charactercheck.substring(i, this.state.charactercheck.length);
        }
        console.log("unhighlighted:", this.state.unhighlighted);
        console.log("highlighted:", this.state.highlighted);

      //})

        /*
        for(let i = 0; i < this.state.story.length; i++) {
          fullString += this.state.story[i];
          console.log("this is the fullstring:", fullString);
        }

        */



        this.setState({story:res});

        // this.setState({squares:res.squares});
        console.log(res);
      })
      .catch(err => err)
  }

  componentDidMount(){
    this.callAPI();
  }




//EVENT HANDLERS

//handles the setting of the itemName variable to reflect what the user is
//inputting
  handleInputNewStory(event) {
    //console.log("NEW HIGHLIGHTED TEST:", this.state.highlighted);
    console.log(event.target.value)

    //sets the value of itemName to whatever the user has input
    this.setState({
      input: event.target.value

    })


/*
console.log(event.target.value)
var charactercheck = event.target.value
for(let i = 0; i < charactercheck.length; i+=50){
  console.log("adding spaces")
  //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
  charactercheck = charactercheck.substring(0, i) + "\n" + charactercheck.substring(i, charactercheck.length);
}


//sets the value of itemName to whatever the user has input
this.setState({
  input: charactercheck

})
*/
  }

  //handles the submission of a new reminder into the reminders list
  handleSubmit(event) {

    console.log("submitting", this.state.input)





    /*
    calls to back end to complete the put method and input a new reminder
    into the list
    */
      fetch('http://localhost:9000/testAPI', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
          //replace with 'newItem'
          'input' : this.state.input,
          //'charactercheck' this.state.charactercheck,
        }),
      })

      // .then (res => {
      //   // let storyString = [];
      //   // for(let i=0; i<=this.state.story.length; i++){
      //   //   storyString.push(this.state.story[i]);
      //   // }
      //
      //   stringify = "";
      //   stringify = JSON.stringify(this.state.story);
      //
      //   console.log("new story formatting:", stringify);
      // })

      // .then(
      //
      //   let charactercheck = this.state.story;
      //   let highlightedportion = charactercheck.length - 3;
      //   console.log("double checking the function of this submit: ", charactercheck , highlightedportion);
      //
      //   return(
      //     <div>
      //
      //       <div
      //       id = "highlightedtext"
      //       >
      //
      //       {highlightedportion}
      //       </div>
      //     </div>
      //   );
      // )


      //POSSIBLY ADD THIS IN
      // .then(res => {
      //   var charactercheck = res;
      //   for(let i = 0; i < charactercheck.length; i+=50){
      //     console.log("adding spaces");

      //     //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
      //     charactercheck = charactercheck.substring(0, i) + "\n" + charactercheck.substring(i, charactercheck.length);
      //   }
      // })

      //.then(res => this.handleHighlightText())
      .then(res => {
        console.log("the res is:", res);
        this.callAPI()

      })
      .then(res => this.setState({input:""}))
    //}
    }

    // handleHighlightText(){
    //   let charactercheck = this.state.story;
    //   let highlightedportion = charactercheck.length - 3;
    //
    //   return (
    //     <div>
    //
    //       <div
    //       id = "highlightedtext"
    //       >
    //
    //       {highlightedportion}
    //       </div>
    //     </div>
    //   );
    // }



    handleDeleteItem(i){

      //makes copy of items list that will be changed and displayed
      const story = this.state.story.slice();

      //sets the value of one item to a specific itemName
      //story[i] = this.state.input;
      this.setState({
        story: story,
      })

      console.log(story)

      //calls to back end to complete the delete method
      fetch('http://localhost:9000/testAPI', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
          //'itemName' : this.state.itemName,
          'story' : this.state.story/*[i]*/,
          // 'charactercheck' : this.state.charactercheck,
          // 'highlighted' : this.state.highlighted,
          // 'unhighlighted' : this.state.unhighlighted,
        }),
      })
      .then(res => this.callAPI())
      // .then(res => {
      //   this.setState({
      //     charactercheck: "",
      //     highlighted: "",
      //     unhighlighted: "",
      //
      //   })
      // })

    }




  // renderText(i){
  //   return (
  //     <Text
  //       text={this.state.story[i]}
  //       key={i}
  //     />
  //   );
  //
  // }




//______________________________________________________________________________
  //Timer

//TIMER CODE PARTIALLY COPIED FROM THIS "MEDIUM" ARTICLE: https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553
  startTimer() {

    this.setState({

      //time: Date.now() - this.state.start,
      time: this.state.time,
      //time: -this.state.time,
    /*change back to + */  start: Date.now() - this.state.time,
      isOn: true
    })


    this.timer = setInterval(() => this.setState({
      //time: this.setState.time,
    /*change back to - */  time: Date.now() - this.state.start,

  }), 1);

    //determining whether the timer should be turned off

    // if(this.state.time >= 0) {
    //   console.log("if statement is working");
    //   this.resetTimer()
    //   this.handleSubmit.bind(this)
    //
    // }


  }







//TIMER CODE PARTIALLY COPIED FROM THIS "MEDIUM" ARTICLE: https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553
  resetTimer() {
    clearInterval(this.timer)
    this.completeTimerReset()
    //SET STATE IS GLITCHING --> SOLVE
    //this.setState({isOn:false})


    //change to pos.
    //this.setState({time: -6000})
  }

  completeTimerReset() {
    //SET STATE IS GLITCHING --> SOLVE
    this.setState({isOn:false})


    //change to pos.
    this.setState({time: -6000})
  }





//______________________________________________________________________________
  // renderTimer(){
  //
  //
  //
  //   return (
  //     <div>
  //       {start}
  //       {reset}
  //
  //     </div>
  //   );
  // }


  render(){


//______________________________________________________________________________
      //Timer

      console.log("timer is working");




       //TIMER CODE PARTIALLY COPIED FROM THIS "MEDIUM" ARTICLE: https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553

//change to pos.
      let start = (this.state.time === -6000) ?
        <button
        //onClick={() => this.handleSubmit()}
        onClick={this.startTimer}
        className="startBtn"
        /*onClick = {
          this.handleSubmit.bind(this),
          console.log("HANDLE SUBMIT BEING TRIGGERED AND BOUND")
        }*/
        >
        start
        </button> :
        null



//______________________________________________________________________________



        let consolelog = console.log("the buttons are working");

        //let charactercheck = this.state.story;
        //let highlightedportion = charactercheck.length - 3;

        // var charactercheck = res;
        //  for(let i = 0; i < charactercheck.length; i+=50){
        //    console.log("adding spaces");

           //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position

        // let charactercheck1 = this.state.story.substring(0, this.state.story.length - 3);
        // let charactercheck2 = this.state.story.substring(this.state.story.length - 3, this.state.story.length);
        // let renderedstory = charactercheck1 + charactercheck2;

         //}


            //id = "highlightedtext"

        // partially from _____
        // setState({
        //   this.state.story.join(''); // 'abc'
        // })

        //this.state.story.join(''); // 'abc'


//TIMER CODE PARTIALLY COPIED FROM THIS "MEDIUM" ARTICLE: https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553
        return(


        <div className="game">

            <Time
              handleSubmit = {this.handleSubmit.bind(this)}
              //handleSumbit={() => this.handleSubmit.bind(this)}
              //resetTimer = {this.handleSubmit.bind(this)}
              resetTimer={() => this.resetTimer()}
              time={this.state.time}

            />




          <div
            className="frontendstory"
          >
            <Text
            // change to .story

              //text={this.state.highlighted + this.state.unhighlighted}
              //change back to code below??
              text={this.state.story}

            />

          </div>

          <div
            id="newtextandfooter"
          >
            <AddNewText
              newStory={this.state.input}
              handleInputNewStory = {this.handleInputNewStory.bind(this)}
              handleSubmit = {this.handleSubmit.bind(this)}
            />

            <button

              onClick={() => this.handleDeleteItem()}
              className="startBtn"

            >
              Delete

            </button>

            {start}

          </div>

        </div>

      );
  }

}



class App extends React.Component {
  render() {
    return (
      <div className="App">

        <h1> React is working</h1>
        <Game />

      </div>
    );
  }
}



// =============================================================================
export default App;
