import React from "react";

const HomePage = (props) => {
    return(
        <div className="primary grid-container">
            <h2 className="secondary header">Welcome to the Salad Theory!</h2>
            <h4 className="secondary header">
                A site dedicated to the sharing and reviewing of salads!
            </h4>
        <div className="home-image">    
            <img className="home-image" src="https://salad-theory.s3.amazonaws.com/saladsalad1.jpg"
                alt="picture of salad"
            > 
            </img>
        </div>    
            <p>
                Developed by Jess, Bob, Todd, Tim
            </p>
        </div>
    )
}

export default HomePage
