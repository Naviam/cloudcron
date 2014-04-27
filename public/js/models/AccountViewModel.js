function organization(org) {
    var self = this;
    self.id =  ko.observable(org.id);
    self.login = ko.observable(org.login);
}

function AccountViewModel(orgs) {
    var self = this;
    self.organizations = ko.observableArray();

    for (var org in orgs) {
        self.organizations.unshift(new organization(model.orgs[org]));
    }

    self.createAccountFromOrganization = function (org) {
        console.log(repo);
        $.post("/account", function(data) {
            self.commits.removeAll();
            $.each(data, function (index, value) {
                self.commits.unshift(value.sha);
            });
        });
    };
}