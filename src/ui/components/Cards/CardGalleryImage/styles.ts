import styled from "styled-components";

export const Container = styled.div`
    width: 300px;
    height: 190px;

    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);

    border: 1px dashed transparent;

    transition: .2s;
    position: relative;

    :hover {
        cursor: move;
        border-color: #222;
    }

    button {
        :hover {
            background: #222;
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
        border-radius: 6px;
    }
`