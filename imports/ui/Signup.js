import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  // flash(e){
  //   let val = e.target.value;
  //   if(val === '2'){
  //     this.setState({
  //       message: "!! married couples only !!"
  //     });
  //   }else{
  //     this.setState({
  //       message: undefined
  //     });
  //   }
  // }


  constructor(props){
    super(props);
    this.state = {
      count: 0,
      // message: ''
      error:''
    };
  }
  onSubmit(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if(password.length < 9) {
      return this.setState({error: 'password must be more than 8 characters long'});
    }

    Accounts.createUser({email, password},(err) => {
      if(err){
        this.setState({
          error:err.reason
        });
      }else{
        this.setState({
          error: ''
        });
      }
    });

    // this.setState({
    //   error: 'Something Went Wrong.'
    // });
  }

  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>join short link</h1>


          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="password"/>
            <button className="button">Create Account</button>
          </form>

          {/* <select name='adult' onChange={this.flash.bind(this)}>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <p>{this.state.message}</p> */}

          <Link to="/">Have an account?</Link>
        </div>

      </div>

    );
  }
}
