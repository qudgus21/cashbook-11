const path = (file) => 'https://cashbook-11.s3.ap-northeast-2.amazonaws.com/assets/' + file; 

const imgPath = {
    ACCOUNT: path('account.svg'),
    ADD_WHITE: path('add_white.svg'),
    BAEDAL: path('baedal.jpg'),
    CALENDAR: path('calendar.svg'),
    CHART: path('chart.svg'),
    CHECK_PRIMARY: path('check-primary.svg'),
    CHECK_WHITE: path('check-white.svg'),
    CHEVRON_DOWN: path('chevron-down.svg'),
    CHEVRON_LEFT: path('chevron-left.svg'),
    CHEVRON_RIGHT: path('chevron-right.svg'),
    CHEVRON_LEFT_WHITE: path('chevron-left-white.svg'),
    CHEVRON_RIGHT_WHITE: path('chevron-right-white.svg'),
    CLOSE: path('close.svg'),
    FILE_TEXT: path('file-text.svg'),
    ON_OFF_BUTTON: path('on-off-button.svg'),
}

export { imgPath as img };