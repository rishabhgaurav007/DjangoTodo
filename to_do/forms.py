from django import forms

class TodoForm(forms.Form):
    text = forms.CharField(max_length=40,
                           widget=forms.TextInput(
                               attrs={'class':'form-control','placeholder':'Enter todo e.g. Delete Junk files','aria-label':'Todo','aria-decribedby':'add-btn'}))