import React, { InputHTMLAttributes, TextareaHTMLAttributes} from 'react';

// MY IMPORTS
import styles from './styles.module.scss';

interface ImputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: ImputProps){
    return(
        <input className={styles.input} {...rest} />
    );
}

export function TextArea({...rest}: TextProps){
    return(
        <textarea className={styles.textArea} {...rest}></textarea>
    );
}