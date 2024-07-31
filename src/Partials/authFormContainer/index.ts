import "./authFormContainer.scss";

export function AuthFormContainer() {
    return `
        <div class="authFormContainer">
            {{> @partial-block}}
        </div>
        `;
}
