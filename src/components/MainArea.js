// react
import React, { useState } from "react";

// materialUI
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

// supercharge
import Str from '@supercharge/strings';

// css
import './areas.css';

export default function MainArea() {
    const [cvalue, setCValue] = useState("");
    const [pvalue, setPValue] = useState("");
    const [rows, setRows] = useState(() => [
        { id: -1, line: '--------------------------'}
    ]);
    
    const cols = [
        { field: 'id', hide: 'true'},
        { field: 'line', headerName: 'line' }    
    ];

    var pasteOrder = [];
    var pasteCount = 0;
    var pasteBox = document.querySelector('div');

    pasteBox.addEventListener('paste', (event) => {
        navigator.clipboard.writeText("");
        if (pasteOrder.length > 0) {
            if (pasteOrder[pasteCount] !== undefined) {
                navigator.clipboard.writeText(pasteOrder[pasteCount]);
                pasteCount++;
            }
        }
    })

    function tableSetup() {
        var separated = Str(cvalue).lines()

        setRows(separated.map((data, index) => [{
            id: index,
            line: data
        }]));
        console.table(separated);

    }

    function assignHighlighted() {
        var selection = window.getSelection();
        var text = selection.toString()

        pasteOrder.push(text);

        console.log(text);
    }

    function resetArr() {
        pasteOrder = [];
        pasteCount = 0;
        navigator.clipboard.writeText("");
    }

    function pasteOnce() { 
       navigator.clipboard.readText().then(cb => {
           setPValue(cb);
       })
    }

    function pasteAll() {
        console.table(pasteOrder);
    }

    return (
        <div className="main">
            <div className="copy area">
                <DataGrid
                    rows={rows}
                    columns={cols}       
                    checkboxSelection
                    hideFooter
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Paste Texts Here"
                    multiline
                    value={cvalue}
                    onChange={(e) => setCValue(e.target.value)}
                    sx={{input:{
                        borderColor: '#1976d2',
                        color: '#1976d2'
                    }}}
                />
                <div className="options">
                    <ButtonGroup className="button" variant="outlined" aria-label="outlined button group">
                        <Button onClick={() => tableSetup()}>Load</Button>
                        <Button onClick={() => assignHighlighted()}>Assign</Button>
                        <Button onClick={() => resetArr()}>Reset</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="paste area">
                <TextField
                    id="outlined-multiline-flexible"
                    className="pasteBox"
                    label="Test Paste Here"
                    multiline
                    fullWidth
                    value={pvalue}
                    onChange={(event) => setPValue(event.target.value)}
                />
                <ButtonGroup className="buttons" variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => pasteOnce()}>Paste</Button>
                    <Button onClick={() => pasteAll()}>Paste All</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}