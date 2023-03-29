import { GlobalVariables } from 'src/app/Helpers/GlobalVariables';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderComponent } from 'src/app/Components/Loader/Loader.component';
import { TokenStorageService } from 'src/app/Services/auth/token-storage.service';
import { UserService } from 'src/app/Services/user/User.service';

@Component({
  selector: 'app-UserInfo',
  templateUrl: './UserInfo.component.html',
  styleUrls: ['../AccountPage.component.scss','./UserInfo.component.scss']
})
export class UserInfoComponent implements OnInit {

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
          LoaderComponent.SetOptions(false,true,true);
          this.tokenStorage.saveUser(data.data);
          console.log(data.message)
        },
        error: (err: any) => {
          LoaderComponent.SetOptions(false, false, true);
          console.log(err)
        }
      })
    });
    reader.readAsDataURL(imageFile);
  }

}
