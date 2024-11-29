import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// authGuard должен быть функцией, не классом, поэтому не используется constructor
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // инъекция Router

  if(localStorage.getItem('loginData')) {
    return true;  // Если данные есть в localStorage, доступ разрешён
  } else {
    router.navigate(['/']);  // Иначе перенаправляем на главную
    return false;  // Доступ запрещён
  }
};
