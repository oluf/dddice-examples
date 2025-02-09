'use client';

import { ThreeDDice } from 'dddice-js';
import {useCallback, useRef} from "react";

export default function Canvas() {
    // Canvas
    const canvasRef = useRef();

    // ThreeDDice class
    const dddice = useRef<ThreeDDice>();

    // Initialize the SDK
    const init = useCallback(() => {
        const input = prompt('Enter API Key');
        if (input) {
            dddice.current = new ThreeDDice(canvasRef.current, input);
            dddice.current.start();
        }
    }, []);

    // Join a room
    const join = useCallback(() => {
        if (!dddice.current) {
            alert('dddice is not initialized');
        }

        const input = prompt('Enter Room Slug');
        if (input) {
            dddice.current.connect(input);
        }
    }, []);

    // Roll dice
    const roll = useCallback(() => {
        if (!dddice.current) {
            alert('dddice is not initialized');
        }

        dddice.current.roll([
            { type: 'd20', theme: 'dddice-bees' }
        ]);
    }, [])

    return (
        <>
            <header>
                <ol>
                    <li>
                        <button onClick={init}>Initialize</button>
                    </li>
                    <li>
                        <button onClick={join}>Join Room</button>
                    </li>
                    <li>
                        <button onClick={roll}>Roll Dice</button>
                    </li>
                </ol>
            </header>

            <canvas ref={canvasRef} height={600} width={800} />
        </>
    )
}