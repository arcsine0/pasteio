// react
import React, { useState } from "react";

// materialUI
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup } from "@mui/material";

// css
import './areas.css';

export default function MainArea() {
    const [cvalue, setCValue] = useState("");
    const [pvalue, setPValue] = useState("");
    
    var pasteOrder = [];

    function assignHighlighted() {
        var selection = window.getSelection();
        var text = selection.toString()
        pasteOrder.push(text);

        console.log(text);
    }

    function pasteAll() {
        console.table(pasteOrder);
    }

    return (
        <div className="main">
            <div className="copy area">
                <div className="copyDisplay">
                    <p className="textWrap">{cvalue}</p>
                </div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Paste Texts Here"
                    multiline
                    value={cvalue}
                    onChange={(event) => setCValue(event.target.value)}
                />
                <ButtonGroup className="buttons" variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => assignHighlighted()}>Assign</Button>
                    <Button>Reset</Button>
                </ButtonGroup>
            </div>
            <div className="paste area">
                <TextField
                    id="outlined-multiline-flexible"
                    label="Output Goes Here"
                    multiline
                    fullWidth
                    value={pvalue}
                    onChange={(event) => setPValue(event.target.value)}
                />
                <ButtonGroup className="buttons" variant="outlined" aria-label="outlined button group">
                    <Button>Paste</Button>
                    <Button onClick={() => pasteAll()}>Paste All</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}