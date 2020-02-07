import React,{useState} from 'react';
import {Icon} from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import'./styles.css';

const Breadcrumb = ({options,lastItem}) => {

    // console.log(style);

    const history = useHistory();
    const [homeHover, setHomeHover] = useState(false);

    

    return (
    <>
        <span style={{'margin-right':'0.5em'}}>&nbsp;</span>
        <span>
            <Icon 
                color= {homeHover?'teal':'black'}
                onMouseEnter={() => setHomeHover(true)}
                onMouseLeave={() => setHomeHover(false)}
                onClick={() => history.push('/')}
                link 
                size='large' 
                name = 'home'/>
        </span>
        {options && options.map((option) => {
            return (
                <>
                    <span style={{'margin-right':'0.3em'}}>
                    &nbsp;
                    </span>
                    <span>
                        >
                    </span>
                    <span style={{'margin-right':'0.3em'}}>
                    &nbsp;
                    </span>
                    <span>
                        <Link className='breadcrumb' to={option.to}>{option.label}</Link>
                    </span>
                </>
            )
        })}
        <span style={{'margin-right':'0.3em'}}>
        &nbsp;
        </span>
        <span>
            >
        </span>
        <span style={{'margin-right':'0.3em'}}>
        &nbsp;
        </span>
        <span>
            {lastItem}
        </span>
    </>
    );
}

export default Breadcrumb;