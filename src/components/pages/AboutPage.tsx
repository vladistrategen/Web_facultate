import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <main style={{ padding: '20px' }}>  {/* Use of <main> for main content */}
            <header>
                <h1>About Us</h1>
            </header>
            <article>
                <section>
                    <h2>Our Mission</h2>
                    <p>Our mission is to <b>connect</b> event organizers and attendees in a <u>seamless</u> and <i>efficient</i> way.</p>
                </section>
                <section>
                    <h2>Contact Us</h2>
                    <p>If you have any questions, please contact us at:</p>
                    <address>
                        <ul>
                            <li>

                                <strong>Email:</strong> <a href="mailto:contact@example.com">contact@example.com</a><br />
                            </li>
                            <li>

                                <strong>Phone:</strong> <a href="tel:+11234567890">123-456-7890</a>
                            </li>
                            <li>
                                Or on social media:
                                <ul>
                                    <li><a href="https://www.facebook.com">Facebook</a></li>
                                    <li><a href="https://www.twitter.com">Twitter</a></li>
                                    <li><a href="https://www.instagram.com">Instagram</a></li>
                                </ul>
                            </li>
                        </ul>
                    </address>
                    
                </section>
            </article>
            <aside>
                <h2>More Info</h2>
                {<code>console.log("We are passionate web developers on a mission to connect people")</code>}



            </aside>
            <section>

                <h2>Our Team</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                    </tr>
                    <tr>
                        <td>Vlad Istrate</td>
                        <td>CEO</td>
                        <td><a href="mailto:J@D.com">email</a></td>
                    </tr>
                    <tr>
                        <td>Vlad Istrate</td>
                        <td>CTO</td>
                        <td><a href="mailto:J@S.com">email</a></td>
                    </tr>
                </table>


                <a href="https://media.istockphoto.com/id/1169564891/ro/fotografie/%C3%AEnt%C3%A2lnire-de-afaceri-de-birou-conferin%C8%9B%C4%83-lucru-%C3%AEn-echip%C4%83.jpg?s=1024x1024&w=is&k=20&c=Qf2ulcrfjSpTYiQypzuLp32Sam-SG2Sg7j8b8NB1ASo=" target="_blank">
                    <img src="https://media.istockphoto.com/id/1169564891/ro/fotografie/%C3%AEnt%C3%A2lnire-de-afaceri-de-birou-conferin%C8%9B%C4%83-lucru-%C3%AEn-echip%C4%83.jpg?s=1024x1024&w=is&k=20&c=Qf2ulcrfjSpTYiQypzuLp32Sam-SG2Sg7j8b8NB1ASo=" alt="random" />
                </a>
                
                

            </section>
            
        </main>
    );
};

export default AboutPage;
