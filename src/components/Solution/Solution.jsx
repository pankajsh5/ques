import React, { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useDispatch, useSelector } from 'react-redux';
import { getSolution,setSolution } from '../../features/solutionSlice';
import { useParams } from 'react-router-dom';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { toast } from 'react-toastify';
import './Solution.css';
import copy from '../../assets/copy.svg';
import edit from '../../assets/edit.svg';
import cross from '../../assets/cross.svg';

function Solution() {

    const dispatch = useDispatch();
    const ax = usePrivateAxios();
    const { id } = useParams();
    // console.log(params);
    let { code, language } = useSelector(state => {
        return state.solution.solutionByQuestionId[`${id}`] 
        || { code : 'no solution provided',language : 'cpp' };
    });

    if( !code )
        code = 'No Solution Provied';
    if( !language )
        language = 'cpp';

    useEffect(() => {
        dispatch(getSolution({ ax, question_id: id }));
    }, []);

    // let code = '';

    // console.log(st);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        toast('copied to clipboard');
    }

    const toggleModal = () => {
        const modal = document.getElementById('solution_modal');

        const display = modal.style.display;
        if (!display || display === 'none') {
            modal.style.display = 'flex';
            document.querySelector('#new_solution').value = code;
            document.querySelector('#langoption').value = language;
            // saveCode();
        }
        else
            modal.style.display = 'none';
    }

    const saveCode = () => {
        let newCode = document.querySelector('#new_solution').value;
        let lang = document.querySelector('#langoption').value;
        dispatch( setSolution({ ax,language:lang,code : newCode,id }) );
        toggleModal();
    }

    // saveCode();


    return (
        <div id='Solution'>
            <h1 className='page_title'>Solution</h1>
            <div id='solution_code'>
                <SyntaxHighlighter showLineNumbers wrapLongLines language={language} style={atomDark}>
                    {"\n" + code}
                </SyntaxHighlighter>
                <div id='solution_controls'>
                    <img src={copy} className='svg-img' alt=""
                        onClick={copyToClipboard}
                    />
                    <img src={edit} className='svg-img' alt=""
                        onClick={toggleModal}
                    />
                </div>
                <p className='label'>{language}</p>
            </div>

            <div id='solution_modal'>
                <h1 className='page_title'>Enter the code here</h1>
                <div id='modal_content'>
                    <textarea name="" id="new_solution" placeholder='Paste your code here!'>
                    </textarea>
                    <select id="langoption">
                        <option value="cpp">Cpp</option>
                        <option value="javascript">Javascript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </div>
                <div>
                    <button onClick={saveCode} className='btn' color='green'>Save</button>
                    <button className='btn' color='red'
                        onClick={toggleModal}
                    >Close</button>
                </div>
                {/* <img src={cross} className='svg-img' alt=""
        onClick={toggleModal} /> */}
            </div>
        </div>
    )
}

export default Solution