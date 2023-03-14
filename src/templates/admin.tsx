import { Aside } from "../components/Aside";

export function AdminTemplate({children}) {
    return (
        <Aside>
            {children}
        </Aside>
    )
}