# Gestion Stock

## Debug

Si on a le message suivant:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.     
For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
```

alors faire dans powershell: 

```ps
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

# Author

Jean-Louis GUENEGO