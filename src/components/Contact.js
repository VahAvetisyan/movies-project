import { useState } from "react";
import "../index.css"

function Contact(){
  
    let [name,setName] = useState("");
    let [email,setEmail] = useState("");
    let [message, setMessage] = useState("");
    
  
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e) => {
  };


return (
    <div className="Contact">
        <form id="contact-form" onSubmit={handleSubmit()} method="POST">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" value={name} onChange={onNameChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={onEmailChange} />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" rows="5" value={message} onChange={onMessageChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
)
}
export default Contact;