'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">spring-petclinic-angular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
    <button type="button"
        class="search-input-clear"
        aria-label="Clear search"
        data-search-input-clear>&times;</button>
</div>
` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="architecture.html" data-type="chapter-link">
                                        <span class="icon ion-ios-git-branch"></span>Architecture
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-e296c7408d757c629a005bda92cd03185bca9add50384ccd29ef3d15ccbc139982f542bb4a336de3e3fb480b138c64d44a3c6b25a515017bee127f061e1e6c99"' : 'data-bs-target="#xs-components-links-module-AppModule-e296c7408d757c629a005bda92cd03185bca9add50384ccd29ef3d15ccbc139982f542bb4a336de3e3fb480b138c64d44a3c6b25a515017bee127f061e1e6c99"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e296c7408d757c629a005bda92cd03185bca9add50384ccd29ef3d15ccbc139982f542bb4a336de3e3fb480b138c64d44a3c6b25a515017bee127f061e1e6c99"' :
                                            'id="xs-components-links-module-AppModule-e296c7408d757c629a005bda92cd03185bca9add50384ccd29ef3d15ccbc139982f542bb4a336de3e3fb480b138c64d44a3c6b25a515017bee127f061e1e6c99"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e296c7408d757c629a005bda92cd03185bca9add50384ccd29ef3d15ccbc139982f542bb4a336de3e3fb480b138c64d44a3c6b25a515017bee127f061e1e6c99"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e296c7408d757c629a005bda92cd03185bca9add50384ccd29ef3d15ccbc139982f542bb4a336de3e3fb480b138c64d44a3c6b25a515017bee127f061e1e6c99"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e296c7408d757c629a005bda92cd03185bca9add50384ccd29ef3d15ccbc139982f542bb4a336de3e3fb480b138c64d44a3c6b25a515017bee127f061e1e6c99"' :
                                        'id="xs-injectables-links-module-AppModule-e296c7408d757c629a005bda92cd03185bca9add50384ccd29ef3d15ccbc139982f542bb4a336de3e3fb480b138c64d44a3c6b25a515017bee127f061e1e6c99"' }>
                                        <li class="link">
                                            <a href="injectables/HttpErrorHandler.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HttpErrorHandler</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OwnersModule.html" data-type="entity-link" >OwnersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OwnersModule-cdfcc7bd61c1e422e6005d089c6655cc1b375680be63b03ac03cec731eec25c33d50efaddee218a433fa49473e968dcae5a5b782e57636c40f8773093e4a5949"' : 'data-bs-target="#xs-components-links-module-OwnersModule-cdfcc7bd61c1e422e6005d089c6655cc1b375680be63b03ac03cec731eec25c33d50efaddee218a433fa49473e968dcae5a5b782e57636c40f8773093e4a5949"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OwnersModule-cdfcc7bd61c1e422e6005d089c6655cc1b375680be63b03ac03cec731eec25c33d50efaddee218a433fa49473e968dcae5a5b782e57636c40f8773093e4a5949"' :
                                            'id="xs-components-links-module-OwnersModule-cdfcc7bd61c1e422e6005d089c6655cc1b375680be63b03ac03cec731eec25c33d50efaddee218a433fa49473e968dcae5a5b782e57636c40f8773093e4a5949"' }>
                                            <li class="link">
                                                <a href="components/OwnerAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OwnerDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OwnerEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OwnerListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OwnersModule-cdfcc7bd61c1e422e6005d089c6655cc1b375680be63b03ac03cec731eec25c33d50efaddee218a433fa49473e968dcae5a5b782e57636c40f8773093e4a5949"' : 'data-bs-target="#xs-injectables-links-module-OwnersModule-cdfcc7bd61c1e422e6005d089c6655cc1b375680be63b03ac03cec731eec25c33d50efaddee218a433fa49473e968dcae5a5b782e57636c40f8773093e4a5949"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OwnersModule-cdfcc7bd61c1e422e6005d089c6655cc1b375680be63b03ac03cec731eec25c33d50efaddee218a433fa49473e968dcae5a5b782e57636c40f8773093e4a5949"' :
                                        'id="xs-injectables-links-module-OwnersModule-cdfcc7bd61c1e422e6005d089c6655cc1b375680be63b03ac03cec731eec25c33d50efaddee218a433fa49473e968dcae5a5b782e57636c40f8773093e4a5949"' }>
                                        <li class="link">
                                            <a href="injectables/OwnerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OwnerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OwnersRoutingModule.html" data-type="entity-link" >OwnersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PartsModule.html" data-type="entity-link" >PartsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PartsModule-f9e9d9ec5b8cd1d0df71b8eb8f61388b8891e982bcea1fb215d543a1b2f612f729337b3ffdd1ef0425fec9900548806bb3b00bf0258477e40cdcf4bf9495e11e"' : 'data-bs-target="#xs-components-links-module-PartsModule-f9e9d9ec5b8cd1d0df71b8eb8f61388b8891e982bcea1fb215d543a1b2f612f729337b3ffdd1ef0425fec9900548806bb3b00bf0258477e40cdcf4bf9495e11e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PartsModule-f9e9d9ec5b8cd1d0df71b8eb8f61388b8891e982bcea1fb215d543a1b2f612f729337b3ffdd1ef0425fec9900548806bb3b00bf0258477e40cdcf4bf9495e11e"' :
                                            'id="xs-components-links-module-PartsModule-f9e9d9ec5b8cd1d0df71b8eb8f61388b8891e982bcea1fb215d543a1b2f612f729337b3ffdd1ef0425fec9900548806bb3b00bf0258477e40cdcf4bf9495e11e"' }>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WelcomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WelcomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PetsModule.html" data-type="entity-link" >PetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PetsModule-d834b0506c9cb974d3a6fe2159625efbb9995650c289b48256f8682c914d2c93c0e47cf50f45d557601579b866c088ee84a9aa81bc3b8dbdc0bf4f2933223452"' : 'data-bs-target="#xs-components-links-module-PetsModule-d834b0506c9cb974d3a6fe2159625efbb9995650c289b48256f8682c914d2c93c0e47cf50f45d557601579b866c088ee84a9aa81bc3b8dbdc0bf4f2933223452"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PetsModule-d834b0506c9cb974d3a6fe2159625efbb9995650c289b48256f8682c914d2c93c0e47cf50f45d557601579b866c088ee84a9aa81bc3b8dbdc0bf4f2933223452"' :
                                            'id="xs-components-links-module-PetsModule-d834b0506c9cb974d3a6fe2159625efbb9995650c289b48256f8682c914d2c93c0e47cf50f45d557601579b866c088ee84a9aa81bc3b8dbdc0bf4f2933223452"' }>
                                            <li class="link">
                                                <a href="components/PetAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PetEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PetListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PetsModule-d834b0506c9cb974d3a6fe2159625efbb9995650c289b48256f8682c914d2c93c0e47cf50f45d557601579b866c088ee84a9aa81bc3b8dbdc0bf4f2933223452"' : 'data-bs-target="#xs-injectables-links-module-PetsModule-d834b0506c9cb974d3a6fe2159625efbb9995650c289b48256f8682c914d2c93c0e47cf50f45d557601579b866c088ee84a9aa81bc3b8dbdc0bf4f2933223452"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PetsModule-d834b0506c9cb974d3a6fe2159625efbb9995650c289b48256f8682c914d2c93c0e47cf50f45d557601579b866c088ee84a9aa81bc3b8dbdc0bf4f2933223452"' :
                                        'id="xs-injectables-links-module-PetsModule-d834b0506c9cb974d3a6fe2159625efbb9995650c289b48256f8682c914d2c93c0e47cf50f45d557601579b866c088ee84a9aa81bc3b8dbdc0bf4f2933223452"' }>
                                        <li class="link">
                                            <a href="injectables/PetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PetsRoutingModule.html" data-type="entity-link" >PetsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PetTypesModule.html" data-type="entity-link" >PetTypesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PetTypesModule-da87b005c551744a0f3d436e5426893d9ef1f6f57db2b708dd6f4d920faf7d7b12dee786099a6d13a81d46c39142be3dffd481db8433e6f1e802a33cf9a0a35c"' : 'data-bs-target="#xs-components-links-module-PetTypesModule-da87b005c551744a0f3d436e5426893d9ef1f6f57db2b708dd6f4d920faf7d7b12dee786099a6d13a81d46c39142be3dffd481db8433e6f1e802a33cf9a0a35c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PetTypesModule-da87b005c551744a0f3d436e5426893d9ef1f6f57db2b708dd6f4d920faf7d7b12dee786099a6d13a81d46c39142be3dffd481db8433e6f1e802a33cf9a0a35c"' :
                                            'id="xs-components-links-module-PetTypesModule-da87b005c551744a0f3d436e5426893d9ef1f6f57db2b708dd6f4d920faf7d7b12dee786099a6d13a81d46c39142be3dffd481db8433e6f1e802a33cf9a0a35c"' }>
                                            <li class="link">
                                                <a href="components/PettypeAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PettypeAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PettypeEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PettypeEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PettypeListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PettypeListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PetTypesModule-da87b005c551744a0f3d436e5426893d9ef1f6f57db2b708dd6f4d920faf7d7b12dee786099a6d13a81d46c39142be3dffd481db8433e6f1e802a33cf9a0a35c"' : 'data-bs-target="#xs-injectables-links-module-PetTypesModule-da87b005c551744a0f3d436e5426893d9ef1f6f57db2b708dd6f4d920faf7d7b12dee786099a6d13a81d46c39142be3dffd481db8433e6f1e802a33cf9a0a35c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PetTypesModule-da87b005c551744a0f3d436e5426893d9ef1f6f57db2b708dd6f4d920faf7d7b12dee786099a6d13a81d46c39142be3dffd481db8433e6f1e802a33cf9a0a35c"' :
                                        'id="xs-injectables-links-module-PetTypesModule-da87b005c551744a0f3d436e5426893d9ef1f6f57db2b708dd6f4d920faf7d7b12dee786099a6d13a81d46c39142be3dffd481db8433e6f1e802a33cf9a0a35c"' }>
                                        <li class="link">
                                            <a href="injectables/PetTypeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PetTypeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PettypesRoutingModule.html" data-type="entity-link" >PettypesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SpecialtiesModule.html" data-type="entity-link" >SpecialtiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SpecialtiesModule-0d4f4a137cda602a11410ed95116d8987c4df8b8e8cdb6e8a543bbe8c84e60d662e253b78c3fb19eb772d1892aa8f37614e9a851e887ce69803d8eb7f8a1002f"' : 'data-bs-target="#xs-components-links-module-SpecialtiesModule-0d4f4a137cda602a11410ed95116d8987c4df8b8e8cdb6e8a543bbe8c84e60d662e253b78c3fb19eb772d1892aa8f37614e9a851e887ce69803d8eb7f8a1002f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpecialtiesModule-0d4f4a137cda602a11410ed95116d8987c4df8b8e8cdb6e8a543bbe8c84e60d662e253b78c3fb19eb772d1892aa8f37614e9a851e887ce69803d8eb7f8a1002f"' :
                                            'id="xs-components-links-module-SpecialtiesModule-0d4f4a137cda602a11410ed95116d8987c4df8b8e8cdb6e8a543bbe8c84e60d662e253b78c3fb19eb772d1892aa8f37614e9a851e887ce69803d8eb7f8a1002f"' }>
                                            <li class="link">
                                                <a href="components/SpecialtyAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecialtyAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpecialtyEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecialtyEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpecialtyListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecialtyListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SpecialtiesModule-0d4f4a137cda602a11410ed95116d8987c4df8b8e8cdb6e8a543bbe8c84e60d662e253b78c3fb19eb772d1892aa8f37614e9a851e887ce69803d8eb7f8a1002f"' : 'data-bs-target="#xs-injectables-links-module-SpecialtiesModule-0d4f4a137cda602a11410ed95116d8987c4df8b8e8cdb6e8a543bbe8c84e60d662e253b78c3fb19eb772d1892aa8f37614e9a851e887ce69803d8eb7f8a1002f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SpecialtiesModule-0d4f4a137cda602a11410ed95116d8987c4df8b8e8cdb6e8a543bbe8c84e60d662e253b78c3fb19eb772d1892aa8f37614e9a851e887ce69803d8eb7f8a1002f"' :
                                        'id="xs-injectables-links-module-SpecialtiesModule-0d4f4a137cda602a11410ed95116d8987c4df8b8e8cdb6e8a543bbe8c84e60d662e253b78c3fb19eb772d1892aa8f37614e9a851e887ce69803d8eb7f8a1002f"' }>
                                        <li class="link">
                                            <a href="injectables/SpecResolver.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecResolver</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SpecialtyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpecialtyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpecialtiesRoutingModule.html" data-type="entity-link" >SpecialtiesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/VetsModule.html" data-type="entity-link" >VetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VetsModule-893edb76b8afa5b6f729dface0e199dcb80571ed2374bd56abaebfb9c962a2a3dc94fc812a4bf4270c2a58201e79fcfe7c381603e0873adc5d8583bc8a80d2e8"' : 'data-bs-target="#xs-components-links-module-VetsModule-893edb76b8afa5b6f729dface0e199dcb80571ed2374bd56abaebfb9c962a2a3dc94fc812a4bf4270c2a58201e79fcfe7c381603e0873adc5d8583bc8a80d2e8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VetsModule-893edb76b8afa5b6f729dface0e199dcb80571ed2374bd56abaebfb9c962a2a3dc94fc812a4bf4270c2a58201e79fcfe7c381603e0873adc5d8583bc8a80d2e8"' :
                                            'id="xs-components-links-module-VetsModule-893edb76b8afa5b6f729dface0e199dcb80571ed2374bd56abaebfb9c962a2a3dc94fc812a4bf4270c2a58201e79fcfe7c381603e0873adc5d8583bc8a80d2e8"' }>
                                            <li class="link">
                                                <a href="components/VetAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VetAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VetEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VetEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VetListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VetListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VetsModule-893edb76b8afa5b6f729dface0e199dcb80571ed2374bd56abaebfb9c962a2a3dc94fc812a4bf4270c2a58201e79fcfe7c381603e0873adc5d8583bc8a80d2e8"' : 'data-bs-target="#xs-injectables-links-module-VetsModule-893edb76b8afa5b6f729dface0e199dcb80571ed2374bd56abaebfb9c962a2a3dc94fc812a4bf4270c2a58201e79fcfe7c381603e0873adc5d8583bc8a80d2e8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VetsModule-893edb76b8afa5b6f729dface0e199dcb80571ed2374bd56abaebfb9c962a2a3dc94fc812a4bf4270c2a58201e79fcfe7c381603e0873adc5d8583bc8a80d2e8"' :
                                        'id="xs-injectables-links-module-VetsModule-893edb76b8afa5b6f729dface0e199dcb80571ed2374bd56abaebfb9c962a2a3dc94fc812a4bf4270c2a58201e79fcfe7c381603e0873adc5d8583bc8a80d2e8"' }>
                                        <li class="link">
                                            <a href="injectables/VetResolver.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VetResolver</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VetsRoutingModule.html" data-type="entity-link" >VetsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/VisitsModule.html" data-type="entity-link" >VisitsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-VisitsModule-018aa283acffff878fcc4c890019140d475de909e1241421a25b4271647dd2232b52e795c45120713684574dc106422ef163051181a65b0604cdcb8e3e7ff6a8"' : 'data-bs-target="#xs-components-links-module-VisitsModule-018aa283acffff878fcc4c890019140d475de909e1241421a25b4271647dd2232b52e795c45120713684574dc106422ef163051181a65b0604cdcb8e3e7ff6a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisitsModule-018aa283acffff878fcc4c890019140d475de909e1241421a25b4271647dd2232b52e795c45120713684574dc106422ef163051181a65b0604cdcb8e3e7ff6a8"' :
                                            'id="xs-components-links-module-VisitsModule-018aa283acffff878fcc4c890019140d475de909e1241421a25b4271647dd2232b52e795c45120713684574dc106422ef163051181a65b0604cdcb8e3e7ff6a8"' }>
                                            <li class="link">
                                                <a href="components/VisitAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisitEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisitListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VisitsModule-018aa283acffff878fcc4c890019140d475de909e1241421a25b4271647dd2232b52e795c45120713684574dc106422ef163051181a65b0604cdcb8e3e7ff6a8"' : 'data-bs-target="#xs-injectables-links-module-VisitsModule-018aa283acffff878fcc4c890019140d475de909e1241421a25b4271647dd2232b52e795c45120713684574dc106422ef163051181a65b0604cdcb8e3e7ff6a8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VisitsModule-018aa283acffff878fcc4c890019140d475de909e1241421a25b4271647dd2232b52e795c45120713684574dc106422ef163051181a65b0604cdcb8e3e7ff6a8"' :
                                        'id="xs-injectables-links-module-VisitsModule-018aa283acffff878fcc4c890019140d475de909e1241421a25b4271647dd2232b52e795c45120713684574dc106422ef163051181a65b0604cdcb8e3e7ff6a8"' }>
                                        <li class="link">
                                            <a href="injectables/VisitService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisitsRoutingModule.html" data-type="entity-link" >VisitsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DummyComponent.html" data-type="entity-link" >DummyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RouterOutletStubComponent.html" data-type="entity-link" >RouterOutletStubComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/RouterLinkStubDirective.html" data-type="entity-link" >RouterLinkStubDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActivatedRouteStub.html" data-type="entity-link" >ActivatedRouteStub</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterStub.html" data-type="entity-link" >RouterStub</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Owner.html" data-type="entity-link" >Owner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pet.html" data-type="entity-link" >Pet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetType.html" data-type="entity-link" >PetType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Specialty.html" data-type="entity-link" >Specialty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vet.html" data-type="entity-link" >Vet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Visit.html" data-type="entity-link" >Visit</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
