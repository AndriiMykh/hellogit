import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {

    static notWhitespaces(control:FormControl):ValidationErrors{
        if ((control.value!=null)&&(control.value.trim().length===0))
            return {'notWhitespaces':true}
        else
            return null;
    }
}
