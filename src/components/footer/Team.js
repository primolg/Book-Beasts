import React from "react";

const Team = () => {

    //add yourself here!  make a cloudinary account to host your images.
    //it's free!  We can style it out later
    const team = [
        {
            name: "Brandon Lowe",
            img: "https://res.cloudinary.com/ddqp7dojc/image/upload/v1665450470/capstone/IMG_20190806_184127_tvhqw4.jpg",
            github: "https://github.com/blowecle",
            linkedin: "https://www.linkedin.com/in/blowecle/",
        },
    ]

    return (
        <div className="team-wrapper">
            {team.map((person) =>
            <div className="team-member">
                <img className="team-img" src={person.img}/>
                <div className="team-name">{person.name}</div>
                <p className="team-github">{person.github}</p>
                <p className="team-linkedin">{person.linkedin}</p>
            </div>
            )}
        </div>
    )
}

export default Team;