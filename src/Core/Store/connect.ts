import { StoreEvents } from ".";
import { TAppState } from "../../Models/appState";
import { isEqual } from "../../Utils/compareFunctions/isEqual";
import Block from "../Block";

export function connect(mapStateToProps: (state: TAppState) => Partial<TAppState>) {
    return function (BlockComponent: typeof Block) {
        return class extends BlockComponent {
            private onChangeStoreCallback: () => void;

            constructor(props: any) {
                const { store } = window;

                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                this.onChangeStoreCallback = () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                };

                // подписываемся на событие
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentWillUnmount();
                window.store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
    };
}
