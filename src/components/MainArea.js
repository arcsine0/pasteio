// react
import React, { useState } from "react";

// materialUI
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, TextareaAutosize } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

// supercharge
import Str from '@supercharge/strings';

// css
import './areas.css';

export default function MainArea() {
    const [cvalue, setCValue] = useState("");
    const [pvalue, setPValue] = useState("");
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    const [pasteOrder, setPasteOrder] = useState([]);
    const [pasteIndex, setPasteIndex] = useState(0);
    const [canPaste, setCanPaste] = useState(false);
    
    const cols = [
        { field: 'id', headerName: 'id', hide: 'true', headerClassName:'header' },
        { field: 'line', headerName: 'line', flex: 1, headerClassName:'header' }    
    ];

    var pasteBox = document.querySelector('div');

    // pasteBox.addEventListener('paste', (e) => {
    //     if (pasteOrder.length > 0) {
    //         if (pasteOrder[pasteCount] !== undefined) {
    //             navigator.clipboard.writeText(pasteOrder[pasteCount].line);
    //             pasteCount++;
    //         }
    //     }
    //     e.preventDefault();
    // });

    function tableSetup() {
        var separated = Str(cvalue).lines()

        setRows(separated.map((data, index) => {
            return {
                id: index,
                line: data
            }
        }));
    }

    function assign() {
        setPasteOrder(selected.map(data => {
            return {
                line: data.line
            }
        }));
        setCanPaste(true);
    }

    function resetArr() {
        setPasteOrder([]);
        setCanPaste(false);
        setPasteIndex(0);
        navigator.clipboard.writeText("");
    }

    function pasteOnce() { 
        console.log(pasteIndex);
        if (pasteOrder.length > 0) {
            if (pasteOrder[pasteIndex] !== undefined) {
                console.log(pasteOrder[pasteIndex].line);
                setPValue(pasteOrder[pasteIndex].line);
                
            }
            setPasteIndex(pasteIndex + 1);
        }
    }

    function pasteAll() {
        console.table(selected);
    }

    return (
        <div className="main">
            <div className="copy area">
                <DataGrid
                    rows={rows}
                    columns={cols}       
                    checkboxSelection
                    hideFooter
                    onSelectionModelChange={(ids) => {
                        const selectedIds = new Set(ids);
                        const selectedRowData = rows.filter((row) => selectedIds.has(row.id));
                        setSelected(selectedRowData);
                    }}
                    sx={{
                        border: 2,
                        borderColor: 'primary.main',
                        color: 'primary.constrastText',
                        backgroundColor: '#fff'
                    }}
                />
                {/* <TextField
                    id="outlined-multiline-flexible"
                    label="Paste Texts Here"
                    multiline
                    value={cvalue}
                    onChange={(e) => setCValue(e.target.value)}
                    sx={{
                        input:
                            {
                            borderColor: '#1976d2',
                            color: '#1976d2'
                    }}  }
                /> */}
                <TextareaAutosize
                    aria-label="paste-box"
                    placeholder="Paste Raw Text Here"
                    value={cvalue}
                    onChange={(e) => setCValue(e.target.value)}
                />
                <div className="options">
                    <ButtonGroup className="button" variant="outlined" aria-label="outlined button group">
                        <Button onClick={() => tableSetup()}>Load</Button>
                        <Button onClick={() => assign()}>Assign</Button>
                        <Button onClick={() => resetArr()}>Reset</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="paste area">
                {/* <TextField
                    id="outlined-multiline-flexible"
                    className="pasteBox"
                    label="Test Paste Here"
                    multiline
                    fullWidth
                    value={pvalue}
                    onChange={(event) => setPValue(event.target.value)}
                /> */}
                <div className="pasteBox">{pvalue}</div>
                <ButtonGroup className="buttons" variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => pasteOnce()}>Paste</Button>
                    <Button onClick={() => pasteAll()}>Paste All</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}