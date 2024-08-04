import "./style.css";
import Button from "../button";
import icon from "../../../public/favicon.svg";
import Shareable from "../../models/shareable.model";

interface BlogPostProp {
    shareable: Shareable;
}

const BlogPost: React.FC<BlogPostProp> = ({ shareable }) => {

    const getMinutesElapsed = (unixEpochTime: number): number => {
        // Get the current time in milliseconds since the Unix epoch
        const currentTime = Date.now();
      
        // Calculate the difference in milliseconds
        const differenceInMs = currentTime - unixEpochTime;
      
        // Convert the difference from milliseconds to minutes
        const differenceInMinutes = Math.floor(differenceInMs / 1000 / 60);
      
        return differenceInMinutes;
      };
    return (
        <div className="blog-post-background-panel">
            <h3 id="name-of-product-h3">{shareable.name}</h3>
            <div className="cost-share-location">
                <p id="cost-of-product-p">${shareable.price.toPrecision(2)}</p>
                <p id="shares-of-product-p">{shareable.shareCount - shareable.shareHolders.length}/{shareable.shareCount} shares left</p>
                <p id="location-product-from-p">{shareable.location}</p>
            </div>
            <img
                src={
                    shareable.images[0]
                }
                id="img-of-product"
            />
            <div className="profile-share">
                <img src={icon} id="img-of-profile-picture" />
                <div className="name-time">
                    <p id="name-of-user-p">{shareable.ownerUsername}</p>
                    <p id="time-since-post-p">{getMinutesElapsed(shareable.date)} mins ago</p>
                </div>
                <Button id="ask-to-share-button" onClick={() => {}}>
                    Ask to share
                </Button>
            </div>
            <p id="caption-of-image-p">
                {shareable.description}
            </p>
        </div>
    );
};

export default BlogPost;
