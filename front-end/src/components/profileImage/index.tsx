import "./style.css";
import { MdPerson } from "react-icons/md";

interface ProfileImageProps {
    profileB64: string;
    size: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profileB64, size }) => {
    if (profileB64 === "") {
        return (
            <div
                style={{
                    width: `${size}px`,
                    height: `${size}px`
                }}
                className="generic-pfp"
            >
                <MdPerson size={size} />
            </div>
        );
    } else {
        return (
            <img
                width={size}
                height={size}
                src={`data:image/png;base64,${profileB64}`}
            />
        );
    }
};

export default ProfileImage;
