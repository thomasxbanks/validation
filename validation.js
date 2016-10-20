function isRequired(target) {
    if (jQuery(target).prop('required')) {
        return true
    }
    return false
}

function isEmpty(target) {;
    if (jQuery(target).val() == '') {
        return true
    }
    return false
}

function isEmail(target) {
    if (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(jQuery(target).val())) {
        console.log('this is an email address')
        return true
    } else {
        console.log('this is not an email address')
        return false
    }
}

function isNumber(target) {
    if (isNaN(jQuery(target).val())) {
        return false
    }
    return true
}

function isPhoneNumber(currentTarget) {
    var userValue = jQuery(currentTarget).val()
    if (/^[0-9 +()]+$/.test(userValue)) {
        return true
    }
    return false
}

function makeValid(target) {
    if (jQuery(target).hasClass('not-valid')) {
        jQuery(target).removeClass('not-valid')
    }
    jQuery(target).addClass('is-valid')
}

function makeInvalid(target) {
    if (jQuery(target).hasClass('is-valid')) {
        jQuery(target).removeClass('is-valid')
    }
    jQuery(target).addClass('not-valid')
}

function makeDirty(target) {
    jQuery(target).removeClass('pristine')
        .addClass('dirty')
}

function makePristine(target) {
    jQuery(target).removeClass('dirty')
        .addClass('pristine')
}

const inputs = $('input, textarea, select')
    .not(':input[type=button], :input[type=submit], :input[type=reset]')

jQuery(inputs).on("blur change keyup", function(e) {
    if (e.keyCode == 9) {
        // keyCode 9 == 'tab'
        // This prevents tabbing between fields triggering the validation
        return
    }
    let currentTarget = e.currentTarget
    makeDirty(currentTarget)
        // check if a mandatory field has content
    if (isRequired(currentTarget) == true) {
        console.log('required')
        if (isEmpty(currentTarget) == true) {
            console.log('required & empty = invalid')
            makeInvalid(currentTarget)
        } else {
            console.log('required & not empty = valid')
            makeValid(currentTarget)
        }
    } else {
        console.log('not required')
        makeValid(currentTarget)
    }

    // if this is an email field
    if (jQuery(currentTarget).attr('type') == 'email') {
        if (isEmail(currentTarget) == true) {
            makeValid(currentTarget)
        } else {
            makeInvalid(currentTarget)
        }
    }

    // if this is a number field
    if (jQuery(currentTarget).attr('type') == 'phone') {
        if (isPhoneNumber(currentTarget)) {
            makeValid(currentTarget)
        } else {
            makeInvalid(currentTarget)
        }
    }

    isFormValid()
})

function isFormValid() {
    let validFields = []

    jQuery(inputs).each(function(i, obj) {
        if (jQuery(obj).hasClass('is-valid')) {
            validFields.push(obj.placeholder)
        }
        if (validFields.length == jQuery(inputs).length) {
            jQuery('input[type="submit"]').prop('disabled', false).addClass('is-valid')
            return true
        } else {
            jQuery('input[type="submit"]').prop('disabled', true).removeClass('is-valid')
        }
    })
    console.log(validFields)
}

jQuery('input[type="reset"]').on('click', function(e) {
    e.preventDefault()
    jQuery(inputs).each(function() {
        jQuery(this).val('')
        makePristine(jQuery(this))
        jQuery('input[type="submit"]').prop('disabled', true)
    })
})

jQuery('form').on('submit', function(e) {
    e.preventDefault()
    if (jQuery('input[type="submit"]').hasClass('is-valid')) {
        console.info('valid form')
        jQuery('input[type="submit"]').click()
    } else {
        console.error('you\'re cheating!')
    }
})
