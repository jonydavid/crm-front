import React, {useState, useCallback} from 'react';
import Autosuggest from 'react-autosuggest';
import languages from './languages';

import styles from '../../../public/styles/Autosuggest.module.scss';
import theme from '../../../public/styles/theme.module.scss';

// import isMobile from 'ismobilejs';

// const focusInputOnSuggestionClick = !isMobile.any;

//esto puede estar en un archivo utils.js
const escapeRegexCharacters = (str:string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = (value:string) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages
        .map(section => {
            return {
                title: section.title,
                languages: section.languages.filter(language =>
                regex.test(language.name)
                )
            };
        })
        .filter(section => section.languages.length > 0);
}

const getSuggestionValue = (suggestion: Autosuggest.GetSuggestionValue<any>) => suggestion.name;

const renderSuggestion = (suggestion: Autosuggest.RenderSuggestion<any>) => <span>{suggestion.name}</span>;

const renderSectionTitle = (section: any) => <strong>{section.title}</strong>;

const getSectionSuggestions = (section: any) => section.languages;

const SearchGlobal = () => {
    const [value, setValue]= useState<string>('')
    const [suggestions, setSuggestion]= useState<any[]>([])
    const [loading, setLoading]= useState<boolean>(false)
    var lastRequestId:any = null;


    const loadSuggestions = (value:any) => {
        // Cancel the previous request
        if (lastRequestId !== null) {
          clearTimeout(lastRequestId);
        }
        
        setLoading(true);
        
        // request
        lastRequestId = setTimeout(() => {
            setLoading(false);
            setSuggestion(getSuggestions(value))
        }, 500);
    }

    const onChange = (event:any, { newValue }:any) => {
        setValue(newValue)
    }

    // const debounce = (func:any) => {
    //     let timer 
    // }

    // const optimizedSearch = useCallback(debounce(onChange), [])

    const onSuggestionsFetchRequested = ({ value }:any) => {
        loadSuggestions(value)
    }

    const onSuggestionsClearRequested = () => {
        setSuggestion([])
    }

    const shouldRenderSuggestions = (value:any, reason:any) => {
        return value.trim().length > 0;
    }

    const inputProps = {
        placeholder: "Buscar",
        value,
        onChange: onChange
    }

    const status = (loading ? 'Loading...' : 'blabla..');

    return (
        <>
            <Autosuggest
                multiSection={true}
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderSectionTitle={renderSectionTitle}
                getSectionSuggestions={getSectionSuggestions}
                inputProps={inputProps}
                highlightFirstSuggestion={true}
                shouldRenderSuggestions={shouldRenderSuggestions}
                //focusInputOnSuggestionClick={focusInputOnSuggestionClick}
                theme={theme}
                id="multiple-sections-example"
            />
            
            <span className={styles.autosuggestLoading}>{status}</span>
        </>
           
    );
}

export default SearchGlobal;