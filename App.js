import React from 'react';
import ReactDOM from 'react-dom';
import Ms from 'pretty-ms';
import './App.css';


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
      toDisplay: 'timer'

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
        }),
      })
      .then(res => {
        // render(){
        //
        //   return(
        //
        //   );
        // }
      })

      //POSSIBLY ADD THIS IN
      // .then(res => {
      //   var charactercheck = res;
      //   for(let i = 0; i < charactercheck.length; i+=50){
      //     console.log("adding spaces");

      //     //Taken from: https://stackoverflow.com/questions/5884353/how-to-insert-a-character-in-a-string-at-a-certain-position
      //     charactercheck = charactercheck.substring(0, i) + "\n" + charactercheck.substring(i, charactercheck.length);
      //   }
      // })


      .then(res => this.callAPI())
      .then(res => this.setState({input:""}))
    //}
    }

    handleDeleteItem(i){

      //makes copy of items list that will be changed and displayed
      const story = this.state.story.slice();

      //sets the value of one item to a specific itemName
      story[i] = this.state.input;
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
          'story' : this.state.story[i],
        }),
      })
      .then(res => this.callAPI())

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





//ORIGINAL START TIMER CODE:
/*
startTimer() {

  this.setState({

    //time: Date.now() - this.state.start,
    time: this.state.time,
    //time: -this.state.time,
    start: Date.now() + this.state.time,
    isOn: true
  })


  this.timer = setInterval(() => this.setState({
    //time: this.setState.time,
    time: Date.now() - this.state.start
  }), 1);

  //determining whether the timer should be turned off
  if(this.state.time === 0) {
    this.resetTimer()

  }


}
*/




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
      // console.log("** THE TIME IS: ", this.state.time);
      // console.log("Date.now is: ", Date.now());

      //Pushes all parts of the Item function into a single array and renders

      //uncomment this if text does not work
      /*
      let storyList = [];
      console.log(this.state.story)
      for(let i = 0; i < this.state.story.length; i++){
        storyList.push(this.renderText(i))
      }
      */

//______________________________________________________________________________
      //Timer

      console.log("timer is working");


      // let resume = (this.state.time !== 0 && !this.state.isOn) ?
      //   <button onClick={this.startTimer}>resume</button> :
      //   null

      // let stop = (this.state.isOn) ?
      //   <button onClick={this.stopTimer}>stop</button> :
      //   null

      //60000

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


        /*

        <h3
        id= "timerID"
        >
        timer: {Ms(this.state.time)}
        </h3>

        */

        // <TimerHit0
        //   handleSubmit = {this.handleSubmit.bind(this)}
        //   time={this.state.time}
        // />

/*
        <Time
          handleSubmit = {this.handleSubmit.bind(this)}
          resetTimer = {this.handleSubmit.bind(this)}
          resetTimer={() => this.resetTimer()}
          time={this.state.time}
          //key={i}
        />

        <h3
        id= "timerID"
        >
          timer: {Ms(this.state.time)}
        </h3>
*/


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
              text={this.state.story}
              //key={i}
            />
            {/*storyList*/}
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

              //onClick={() => props.handleDeleteItem()}
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

// <Footer
//
// />


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




//______________________________________________________________________________

//Original timer CODE

/*

class Timer extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: false,
      toDisplay: 'timer'
    }
    this.startTimer = this.startTimer.bind(this)
    //this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  // stopTimer() {
  //   this.setState({isOn: false})
  //   clearInterval(this.timer)
  // }
  resetTimer() {
    this.setState({isOn:false})
    clearInterval(this.timer)

    this.setState({time: 0})
  }
  render() {
    console.log("timer is working");

    let start = (this.state.time == 0) ?
      <button
      onClick={this.startTimer}
      className="startBtn"
      >
      start
      </button> :
      null
    // let stop = (this.state.isOn) ?
    //   <button onClick={this.stopTimer}>stop</button> :
    //   null
    let reset = (this.state.time != 0 && !this.state.isOn) ?
      <button
      onClick={this.resetTimer}
      className="refreshBtn"
      >
      reset
      </button> :
      null
    // let resume = (this.state.time != 0 && !this.state.isOn) ?
    //   <button onClick={this.startTimer}>resume</button> :
    //   null
    if(this.state.toDisplay === 'timer'){
      return(
        <div>

          <h3
          id= "timerID"
          >
          timer: {this.state.time}
          </h3>
        </div>
      )
    }
    else {
      console.log('returning start stop')
      return(
        <div>
          <div>
            {this.start}
            {this.reset}
          </div>
        </div>
      )
    }

  }
}
*/




/*

function StartStop(props){
  console.log("start stop is running");

    let start = (props.time == 0) ?
      <button
      onClick={props.start}
      className="startBtn"
      >
      start
      </button> :
      null
    // let stop = (this.state.isOn) ?
    //   <button onClick={this.stopTimer}>stop</button> :
    //   null
    let reset = (props.time != 0 && !props.on) ?
      <button
      onClick={props.reset}
      className="refreshBtn"
      >
      reset
      </button> :
      null
    return (
      <div>
        {start}
        {reset}
      </div>

    );


}

class Timer extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      time: 0,
      start: 0,
      isOn: false,
      toDisplay: 'timer'
    }
    this.startTimer = this.startTimer.bind(this)
    //this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  // stopTimer() {
  //   this.setState({isOn: false})
  //   clearInterval(this.timer)
  // }
  resetTimer() {
    this.setState({isOn:false})
    clearInterval(this.timer)

    this.setState({time: 0})
  }
  render() {
    console.log("timer is working");


    // let resume = (this.state.time != 0 && !this.state.isOn) ?
    //   <button onClick={this.startTimer}>resume</button> :
    //   null

      return(
        <div>

          <h3
          id= "timerID"
          >
          timer: {this.state.time}
          </h3>

          <div>
            <StartStop
              start = {this.startTimer()}
              reset = {this.resetTimer()}
              time = {this.state.time}
              on = {this.state.isOn}
            />


          </div>


        </div>
      );


  }
}

*/
