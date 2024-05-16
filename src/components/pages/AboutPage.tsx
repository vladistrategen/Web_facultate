import React, { useEffect, useState } from 'react';

const AboutPage: React.FC = () => {
    const [viewMore, setViewMore] = useState(false);

    const toggleViewMore = () => {
        setViewMore(!viewMore);
    };

    useEffect(() => {
    }, [viewMore]);
    return (
        <main style={{ padding: '20px' }}>  
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
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <tr >
                        <th style={{ border: '1px solid black' }}>Name</th>
                        <th style={{ border: '1px solid black' }}>Role</th>
                        <th style={{ border: '1px solid black' }}>Contact</th>
                    </tr>
                    <tr style={{ border: '1px solid black' }}>
                        <td>Vlad Istrate</td>
                        <td style={{ border: '1px solid black' }}>
                            <table>
                                <tr style={{ border: '1px solid black' }}>
                                    <td>CEO</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}> 
                                    <td>CTO</td>
                                </tr>
                            </table>
                        </td>
                        <td ><table>

                            <tr> <a href="mailto:contact@example.com">contact@example.com</a><br /></tr>

                            <tr> <a href="tel:+11234567890">123-456-7890</a></tr>
                        </table></td>
                    </tr>
                    <tr style={{ border: '1px solid black' }}>
                        <td>Coechipier 1</td>
                        <td style={{ border: '1px solid black' }}>
                            <table>
                                <tr>
                                    <td>COO</td>
                                </tr>
                            </table>
                        </td>
                        <td><table>

                            <tr> <a href="mailto:contact@example.com">contact@example.com</a><br /></tr>

                            <tr> <a href="tel:+11234567890">123-456-7890</a></tr>
                        </table></td>
                    </tr>
                    <tr style={{ border: '1px solid black' }}>
                        <td>Coechipier 2</td>
                        <td style={{ border: '1px solid black' }}>
                            <table>
                                <tr style={{ border: '1px solid black' }}>
                                    <td>Chief Designer</td>
                                </tr>
                                <tr style={{ border: '1px solid black' }}>
                                    <td>Product Manager</td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table>

                                <tr> <a href="mailto:contact@example.com">contact@example.com</a><br /></tr>

                                <tr> <a href="tel:+11234567890">123-456-7890</a></tr>
                            </table>
                        </td>
                    </tr>
                </table>



                <a href="https://media.istockphoto.com/id/1169564891/ro/fotografie/%C3%AEnt%C3%A2lnire-de-afaceri-de-birou-conferin%C8%9B%C4%83-lucru-%C3%AEn-echip%C4%83.jpg?s=1024x1024&w=is&k=20&c=Qf2ulcrfjSpTYiQypzuLp32Sam-SG2Sg7j8b8NB1ASo=" target="_blank">
                    <img src="https://media.istockphoto.com/id/1169564891/ro/fotografie/%C3%AEnt%C3%A2lnire-de-afaceri-de-birou-conferin%C8%9B%C4%83-lucru-%C3%AEn-echip%C4%83.jpg?s=1024x1024&w=is&k=20&c=Qf2ulcrfjSpTYiQypzuLp32Sam-SG2Sg7j8b8NB1ASo=" alt="random" />
                </a>



            </section>
            <section>
                <h2>Our Services</h2>
                <ul>
                    <li>Web Development</li>
                    <li>Mobile Development</li>
                    {viewMore && (
                        <>
                            <li>SEO</li>
                            <li>UI/UX Design</li>
                            <li>Consulting</li>
                        </>
                    )}
                    <button onClick={toggleViewMore}>
                        {viewMore ? 'View less' : 'View more'}
                    </button>
                </ul>
            </section>
        </main>
    );
};

export default AboutPage;
