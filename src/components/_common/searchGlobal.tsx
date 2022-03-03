import React, {useState, useCallback} from 'react';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash.debounce';
import axios, { AxiosError } from 'axios'

import styles from '../../../public/styles/Autosuggest.module.scss';
import theme from '../../../public/styles/theme.module.scss';
import { Spinner } from 'react-bootstrap';

import languages from './languages';

// import isMobile from 'ismobilejs';

// const focusInputOnSuggestionClick = !isMobile.any;

//TODO ESTO VA A helpers o utils.js---- 
const escapeRegexCharacters = (str:string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function handleAxiosError(error: AxiosError<any, any>) {
    throw new Error('Function not implemented.');
}
function handleUnexpectedError(error: unknown) {
    throw new Error('Function not implemented.');
}
// ------------------------------------


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
                languages: section.data.filter(data =>
                regex.test(data.name)
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

    const fetchData = async (value:any) => {
        setLoading(true);
        // // request
        setTimeout(() => {
            setSuggestion(getSuggestions(value))
            setLoading(false);
        }, 500);

        // let user: User = null;
        // try {
        //     const { data } = await axios.get('/user?ID=12345');
        //     user = data.userDetails;
        //     setSuggestion(getSuggestions(user))
        //     setLoading(false);
        // } catch (error) {
        //     if (axios.isAxiosError(error)) {
        //         handleAxiosError(error);
        //         setLoading(false);
        //     } else {
        //         handleUnexpectedError(error);
        //         setLoading(false);
        //     }
        // }
    }

    const onChange = (event:any, { newValue }:any) => {
        setValue(newValue)
    }

    const debouncedSearch = useCallback(
        debounce((value:any) => fetchData(value), 300),
        []
    )

    const onSuggestionsFetchRequested = ({ value }:any) => {
        debouncedSearch(value)
    }

    const onSuggestionsClearRequested = () => {
        setSuggestion([])
    }

    const shouldRenderSuggestions = (value:string, reason:any) => {
        return value.trim().length > 1;
    }

    const inputProps = {
        placeholder: "Buscar...",
        value,
        onChange: onChange
    }

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
            {loading && <Spinner className={styles.autosugestLoading} color='primary' animation={'border'} />}
        </>
           
    );
}

export default SearchGlobal;
