import React, {Component} from 'react';


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            registerEmail:'',
            registerPassword:'',
            registerName:''
        }
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onSubmitRegister = () =>{
        fetch('https://detect-face-server.onrender.com/register', {
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(
                {
                    email: this.state.registerEmail,
                    password: this.state.registerPassword,
                    name: this.state.registerName
                }
            )
        })
            .then(response => response.json())
            .then(user => {
                if (user.user_id)
                {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home')
                }
            })
        
    }

    render (){
        
        return (
            <article className="mw6 center  br3 mv4 ba b--black-10 shadow-5 w-100 w-50-m w-50-l">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f4" htmlFor="first-name">Name</label>
                        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="first-name"  id="first-name"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib br3" 
                        type="submit" 
                        value="Register"
                        onClick={this.onSubmitRegister}
                        />
                    </div>
                </div>
            </main>
       </article>
        );
    }

} 
export default Register;