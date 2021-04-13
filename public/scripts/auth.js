$(document).ready(() => {
    $('#user').on('focusout', () => {
        $('#extra-check').fadeOut('slow')
        const value = $('#user').val()

        if (!value || value === '') {
            $('#user-check').text('🡓 Username is required.')
            $('#user-check').fadeIn('slow')
            return
        }

        if (value.length < 4) {
            $('#user-check').text('🡓 Provided username is too short!')
            $('#user-check').fadeIn('slow')
            return
        }

        if (value.length > 16) {
            $('#user-check').text('🡓 Provided username is too long!')
            $('#user-check').fadeIn('slow')
            return
        }

        $('#user-check').fadeOut('slow')
    })

    $('#pass').on('focusout', () => {
        const value = $('#pass').val()

        if (!value || value === '') {
            $('#pass-check').text('🡓 Password is required.')
            $('#pass-check').fadeIn('slow')
            return
        }

        if (value.length < 6) {
            $('#pass-check').text('🡓 Password is too short!')
            $('#pass-check').fadeIn('slow')
            return
        }

        if (value.length > 32) {
            $('#pass-check').text('🡓 Password is too long!')
            $('#pass-check').fadeIn('slow')
            return
        }

        $('#pass-check').fadeOut('slow')
    })

    $('#key').on('focusout', () => {
        const value = $('#key').val()

        if (!value || value === '') {
            $('#key-check').text('🡓 Admin key is required.')
            $('#key-check').fadeIn('slow')
            return
        }

        $('#key-check').fadeOut('slow')
    })

    const value = $('#extra').text()

    if (value && value !== '') {
        if (value[0] === '✖') {
            $('#extra-check').fadeIn('slow')
            $('#extra-check').css('color', '#ce1212')
        }
        
        if (value[0] === '✓') {
            $('#extra-check').fadeIn('slow')
            $('#extra-check').css('color', '#4ecca3')
        }
    }
})