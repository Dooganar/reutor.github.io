const $ = ele => {return document.getElementById(ele)}


auth.onAuthStateChanged(user => {
    console.log(user)
    if (user) {
        $('welcomeMessage').innerHTML = `Welcome, ${user.email.slice(0, user.email.lastIndexOf('@'))}`  
        $('signup_button').innerHTML = `<br><p class="navButton">Logout</p><br><p class="navButton">Account</p>`
        $('signup_button').className = ""
    } else{
        console.log("user not signed in")
    }
})
    



$('signup_button').addEventListener('click', e => {
  if (e.target.innerHTML == "LOGIN/SIGNUP") {
  $('signup_form').style.display = $('signup_form').style.display == "block" ? "none" : "block";}
  else if (e.target.innerHTML == "Logout") {
      auth.signOut().then(() => location.reload());
  }
  else {
      location.assign('account.html')
  }
})
$('signup_form').getElementsByTagName('form')[0].addEventListener('submit', e => {
    e.preventDefault();
    ([]).forEach.call(document.getElementsByClassName('error'), ele => {ele.innerHTML = "";})
    auth.signInWithEmailAndPassword(e.target.username.value + "@rutor.com", e.target.password.value).then(() => {window.location.reload()}).catch(error => {e.target.nextElementSibling.innerHTML = error.message});
})
$('signup_form').getElementsByTagName('form')[1].addEventListener('submit', e => {
    e.preventDefault();
    ([]).forEach.call(document.getElementsByClassName('error'), ele => {ele.innerHTML = "";})
    if (e.target.password.value == e.target.confirm.value) {
    auth.createUserWithEmailAndPassword(e.target.username.value + "@rutor.com", e.target.password.value).then(() => {window.location.reload()}).catch(error => {e.target.nextElementSibling.innerHTML = error.message});
    }
    else {
        e.target.nextElementSibling.innerHTML = "Passwords do not match";
    }
})
