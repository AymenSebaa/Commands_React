const upper = /(?=.*[A-Z])/;
const lower = /(?=.*[a-z])/;
const number = /(?=.*\d)/;
const special = /[!@#$%^&*(),.?":{}|<>]/;
const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;

export const validate = (value, name, rules) => {
    let errors = [];
    rules.map(rule => {
        switch(rule) {
            case 'required':
                if(value === '') errors.push(name+' is required'); 
                return
            case 'email': 
                if(!email.test(value)) errors.push('must be an email (ex: example@email.com)');
                break;
            case 'password': 
                if(!number.test(value)) errors.push(name+' must contain at least 1 number');
                if(!upper.test(value)) errors.push(name+' must contain at least 1 upper character');
                if(!lower.test(value)) errors.push(name+' must contain at least 1 lower character');
                if(!special.test(value)) errors.push(name+' must contain at least 1 special character');
                if(value.length < 8) errors.push(name+' must have at least 8 characters');
                break;
            case 'number': if(!number.test(value)) errors.push(name+' must contain at least 1 number'); break;
            case 'upper': if(!upper.test(value)) errors.push(name+' must contain at least 1 upper character'); break;
            case 'lower': if(!lower.test(value)) errors.push(name+' must contain at least 1 lower character'); break;
            case 'special': if(!special.test(value)) errors.push(name+' must contain at least 1 special character'); break;
        }
        if(rule.includes('min')){
            let min = rule.split(':')[1];
            if(value.length < min)  errors.push(name+' must have at least '+min+' characters');
        } else if(rule.includes('max')){
            let max = rule.split(':')[1];
            if(value.length < max)  errors.push(name+' must have less then '+max+' characters');
        } else if(rule.includes('confirm')){
            let password = rule.split(':')[1];
            if(value !== password) errors.push('password doesn\'t match');
        }
    })
    
    return errors;
}