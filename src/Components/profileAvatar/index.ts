import noImage from "../../assets/images/profile_icon.svg";
import styles from "./userImage.module.scss";
import Block from "../../Core/Block";

interface ProfileAvatarProps {
    ssrc?: string;
    isSmall?: boolean;
    onClick?: () => void;
}

class ProfileAvatar extends Block {
    constructor(props: ProfileAvatarProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }

    protected render() {
        const { src, isSmall } = this._props;
        const divClass = isSmall
            ? [styles.userImage, styles.userImageSmall].join(" ")
            : styles.userImage;
        let image = `
            <img src="${noImage}" alt="Изображение пользователя" />
        `;

        if (src) {
            image = `
                <img src="${src}" alt="Изображение пользователя" />
            `;
        }

        return `
            <div class="${divClass}">
                ${image}
            </div>
            `;
    }
}

export { ProfileAvatar };
