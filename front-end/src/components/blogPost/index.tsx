import "./style.css";
import Button from "../button";
import icon from "../../../public/favicon.svg";

const BlogPost = () => {
    return (
        <div className="blog-post-background-panel">
            <h3 id="name-of-product-h3">yukon gold potatoes 5lb. bag</h3>
            <div className="cost-share-location">
                <p id="cost-of-product-p">$1.47</p>
                <p id="shares-of-product-p">3/4 shares left</p>
                <p id="location-product-from-p">Costco Wholesale</p>
            </div>
            <img
                src={
                    "https://as2.ftcdn.net/v2/jpg/02/97/36/57/1000_F_297365796_tzAe7Q0kMi2K0zS1A40OkCyLpENFLzD5.jpg"
                }
                id="img-of-product"
            />
            <div className="profile-share">
                <img src={icon} id="img-of-profile-picture" />
                <div className="name-time">
                    <p id="name-of-user-p">Kenny Wu</p>
                    <p id="time-since-post-p">25 mins ago</p>
                </div>
                <Button id="ask-to-share-button" onClick={() => {}}>
                    Ask to share
                </Button>
            </div>
            <p id="caption-of-image-p">
                Hey guys! Anyone want to share some delicious potatoes for the
                holidays?
            </p>
        </div>
    );
};

export default BlogPost;
