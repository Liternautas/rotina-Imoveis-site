import { Aside } from "../components/Aside";

export default function AdminTemplate({children}) {
    return (
        <Aside>
            {children}
        </Aside>
    )
}