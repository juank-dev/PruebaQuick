import Swal from 'sweetalert2';

export const ICON = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  QUESTION: 'question',
};

export const AlertForm = ({ title = '', text = '', icon = ICON.INFO, position = 'center', timer = 7000 }) => {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: icon === ICON.SUCCESS ? false : true,
    timer,
    timerProgressBar: true,
  });

  Toast.fire({
    icon,
    title,
    text,
  });
};

export const AlertFormLarge = ({ title = '', text = '', icon = ICON.INFO, footer = null }) => {
  Swal.fire({
    icon,
    title,
    text,
    footer,
  });
};

export const AlertConfirm = ({
  title = '',
  text = '',
  icon = ICON.WARNING,
  callback = () => {},
  textButton = 'Yes',
  showCancelButton = true,
}) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: showCancelButton,
    confirmButtonColor: 'var(--blue-dark)',
    cancelButtonColor: 'var(--red-color)',
    confirmButtonText: textButton,
    cancelButtonText: 'No',
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

export const AlertConfirmThree = ({
  title = '',
  html = '',
  callback = () => {},
  fallback = () => {},
  textButton = 'Yes',
  textDeny = 'No',
}) => {
  Swal.fire({
    title,
    html,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: textButton,
    denyButtonText: textDeny,
    allowOutsideClick: false,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      callback();
    } else if (result.isDenied) {
      fallback();
    }
  });
};

export const AlertHTML = ({ title = '', html = '', icon = ICON.INFO, footer = null }) => {
  Swal.fire({
    icon,
    title,
    html,
    footer,
  });
};

export const AlertConfirmHTML = ({
  title = '',
  html = '',
  icon = ICON.WARNING,
  callback = () => {},
  fallback = () => {},
  textButton = 'Yes',
}) => {
  Swal.fire({
    title,
    html,
    icon,
    showCancelButton: true,
    confirmButtonColor: 'var(--blue-dark)',
    cancelButtonColor: 'var(--red-color)',
    confirmButtonText: textButton,
    cancelButtonText: 'No',
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    } else if (result.dismiss === 'cancel') {
      fallback();
    }
  });
};

export const AlertLoading = ({ title = 'Guardando...', text = '', allowOutsideClick = false }) => {
  Swal.fire({
    title,
    text,
    allowOutsideClick,
  });
  Swal.showLoading();
};

export const AlertClose = () => {
  Swal.close();
};
