import TextBox from './text-box.js';
import { html, css } from 'lit';
import { injectStyles } from '../../modules/utilities.js';

export default class PasswordBox extends TextBox {
    #styleId = 'password-box-styles';

    static properties = {
        revealed: { type: Boolean, reflect: true }, // şifrenin görünür olup olmadığını tutar
        spellcheck: { type: Boolean, reflect: true },
    };

    static styles = css`
        :is(password-box, confirm-password-box) {
            --password-indicator-size: 20px;
            --password-toggle-right-distance: 8px;

            --password-toggle-color: #6c6c6c;
            --password-toggle-hover: #3e3e3e;
            --password-toggle-active: #222;
            --password-toggle-bg-hover: rgba(0, 0, 0, 0.05);
            --password-toggle-bg-active: rgba(0, 0, 0, 0.1);

            position: relative;
            display: inline-block;
        }

        :is(password-box, new-password-box, confirm-password-box) > .btn-toggle {
            /* position: absolute;
            top: 50%;
            transform: translateY(-50%); */

            width: var(--password-indicator-size);
            height: var(--password-indicator-size);
            transition: all 0.2s;

            border: none;
            background: none;
            line-height: 0px;
            padding: 2px;
            right: var(--password-toggle-right-distance);
            border-radius: 3px;

            color: var(--password-toggle-color);

            cursor: pointer;
        }

        :is(password-box, new-password-box, confirm-password-box) > .btn-toggle:hover {
            background: var(--password-toggle-bg-hover);
            color: var(--password-toggle-hover);
        }

        :is(password-box, new-password-box, confirm-password-box) > .btn-toggle:active {
            background: var(--password-toggle-bg-active);
            /* transform: translateY(-50%) scale(0.85); */
            transform: scale(0.85);
            color: var(--password-toggle-active);
        }

        :is(password-box, new-password-box, confirm-password-box) > .btn-toggle > svg {
            color: inherit;
            fill: currentColor;
        }
        :is(password-box, new-password-box, confirm-password-box) > .btn-toggle > svg:first-child,
        :is(password-box, new-password-box, confirm-password-box)[revealed] > .btn-toggle > svg:last-child {
            display: none;
        }

        :is(password-box, new-password-box, confirm-password-box)[revealed] > .btn-toggle > svg:first-child,
        :is(password-box, new-password-box, confirm-password-box) > .btn-toggle > svg:last-child {
            display: block;
        }
    `;

    validate(value) {
        const base = super.validate(value);

        if (base) return base;
        if (/\s/.test(value)) return `${this.label} alanı boşluk içermemelidir.`;
    }

    constructor() {
        super();
        this.type = 'password';
        this.autocomplete = 'current-password';
        this.revealed = false;
        this.spellcheck = false;

        injectStyles(this.#styleId, this.constructor.styles.cssText);
    }

    #toggleVisibility() {
        this.revealed = !this.revealed;
        this.inputElement.type = this.revealed ? 'text' : 'password';
    }

    render() {
        const base = super.render ? super.render() : html``;

        return html`
            ${base}
            <button
                type="button"
                @click=${this.#toggleVisibility}
                aria-label=${this.revealed ? 'Şifreyi gizle' : 'Şifreyi göster'}
                aria-pressed=${this.revealed}
                class="btn-toggle"
            >
                <!-- açık ikon -->
                <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                        d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                    />
                    <path
                        d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                    />
                    <path
                        d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"
                    />
                    <path d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" fill-rule="evenodd" />
                </svg>

                <!-- kapalı ikon -->
                <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                        fill-rule="evenodd"
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"
                    />
                    <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
            </button>
        `;
    }
}

customElements.define('password-box', PasswordBox);
