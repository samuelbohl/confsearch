import { Carousel, Card, Button } from "antd";

// const tip5: HTMLElement = (
//     <div>
//         <div className="h5">Tip : Calendar Icon</div>
//         <p>By clicking on the calendar item you can download the relevant dates for the corresponding conference.</p>
//     </div>
// );

// const tip7: HTMLElement = (
//     <div>
//         <div className="h5">Tip : Hover</div>
//         <p>By hovering over objects on the page you can often get more information. Try it!</p>
//     </div>
// );

// const tip8: HTMLElement = (
//     <div>
//         <div className="h5">About</div>
//         <p>
//             If you want to learn more about who created this webpage, then please{" "}
//             <Button type="link" className="alert-link" href="/about">
//                 click here
//             </a>
//             .
//         </p>
//         <p>
//             <b>Click on the next button below to get some tips!</b>
//         </p>
//     </div>
// );

const Tips = () => {
    return (
        <Carousel dots={false} fade={true} className="Main_Carousel" autoplay autoplaySpeed={5000}>
            <div>
                <Card title="Keyword Search" className="TipCard">
                    <div>
                        You can search for keywords. You could for example search for your paper title.
                        The results will consist of the most relevant conferences for these keywords.
                    </div>
                </Card>
            </div>

            <div>
                <Card title="Author Search" className="TipCard">
                    <div>
                        You can search for authors, which results in an author search request. The results will be based on where
                        the author has published recently. The names of the authors are based on <Button type="link" href="https://dblp.org/">dblp</Button>.
                    </div>
                </Card>
            </div>

            <div>
                <Card title="Similar Conferences Search" className="TipCard">
                    <div>
                        By searching for a <em>single Acronym Key</em> or an <em>exact Conference Name</em>, you can search for
                        similar conferences.
                    </div>
                </Card>
            </div>

            <div>
                <Card title="Bookmarking" className="TipCard">
                    <div>
                        By looking into the details page of a conference you can find a field <em>Acronym Key</em>. You can use this
                        key in order to generate a list of conferences. Simply, enter multiple such keys into the search bar,
                        separated by a single space ' ', then copy/store the url for later.
                    </div>
                </Card>
            </div>

            <div>
                <Card title="Contact" className="TipCard">
                    <div>
                        If you should run into any trouble. Do not hesitate to reach out to us by <Button type="link" href="mailto:alexthillen852@gmail.com">mail</Button>.
                    </div>
                </Card>
            </div>
        </Carousel>
    )
}

export default Tips;