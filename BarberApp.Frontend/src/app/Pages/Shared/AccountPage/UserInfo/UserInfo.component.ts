import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { UserService } from 'src/app/Services/user/User.service';
import { AppColors } from 'src/app/Models/Enums/app-colors.enum';

@Component({
  selector: 'app-UserInfo',
  templateUrl: './UserInfo.component.html',
  styleUrls: ['../AccountPage.component.scss','./UserInfo.component.scss']
})
export class UserInfoComponent implements OnInit {

  appColors = AppColors;

  get userInfo() {
    return this.tokenStorage.getUserModel();
  }

  get isAdmin() {
    return GlobalVariables.isAdmin;
  }

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.userInfo.userConfig.primaryColor)
  }

  goToRoute(route: string) {
    this.router.navigateByUrl(`/Account/${route}`);
  }

  uploadProfilePic(event: any) {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const base64Image = reader.result?.toString().split(',')[1];
      this.userService.updateProfilePic(base64Image).subscribe({
        next: (data: any) => {
          this.tokenStorage.saveUser(data.data);
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    });
    reader.readAsDataURL(imageFile);
  }

  uploadAppColor(color: string) {
    if (color === this.userInfo.userConfig.primaryColor)
      return;

    const userConfig = this.userInfo.userConfig;
    userConfig.primaryColor = color;

    this.userService.updateUserConfig(userConfig).subscribe({
      next: (data: any) => {
        console.log(data)
        this.tokenStorage.saveUser(data.data);
        GlobalVariables.loadUserConfig(this.userInfo.userConfig)
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }

}
