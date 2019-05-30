import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class UtilitiesService {
  constructor (private http: HttpClient) { }

  public getlanguages (): Array<{id: string, value: string}> {
    const languages = [{ 'id': 'so_SO', 'value': 'Af-Soomaali' },
    { 'id': 'af_ZA', 'value': 'Afrikaans' },
    { 'id': 'az_AZ', 'value': 'Azərbaycan dili' },
    { 'id': 'id_ID', 'value': 'Bahasa Indonesia' },
    { 'id': 'ms_MY', 'value': 'Bahasa Melayu' },
    { 'id': 'jv_ID', 'value': 'Basa Jawa' },
    { 'id': 'cx_PH', 'value': 'Bisaya' },
    { 'id': 'bs_BA', 'value': 'Bosanski' },
    { 'id': 'br_FR', 'value': 'Brezhoneg' },
    { 'id': 'ca_ES', 'value': 'Català' },
    { 'id': 'cs_CZ', 'value': 'Čeština' },
    { 'id': 'co_FR', 'value': 'Corsu' },
    { 'id': 'cy_GB', 'value': 'Cymraeg' },
    { 'id': 'da_DK', 'value': 'Dansk' },
    { 'id': 'de_DE', 'value': 'Deutsch' },
    { 'id': 'et_EE', 'value': 'Eesti' },
    { 'id': 'en_PI', 'value': 'English (Pirate)' },
    { 'id': 'en_GB', 'value': 'English (UK)' },
    { 'id': 'en_US', 'value': 'English (US)' },
    { 'id': 'en_UD', 'value': 'English (uʍop əpısdՈ)' },
    { 'id': 'es_LA', 'value': 'Español' },
    { 'id': 'es_ES', 'value': 'Español (España)' },
    { 'id': 'eo_EO', 'value': 'Esperanto' },
    { 'id': 'eu_ES', 'value': 'Euskara' },
    { 'id': 'tl_PH', 'value': 'Filipino' },
    { 'id': 'fo_FO', 'value': 'Føroyskt' },
    { 'id': 'fr_CA', 'value': 'Français (Canada)' },
    { 'id': 'fr_FR', 'value': 'Français (France)' },
    { 'id': 'fy_NL', 'value': 'Frysk' },
    { 'id': 'ga_IE', 'value': 'Gaeilge' },
    { 'id': 'gl_ES', 'value': 'Galego' },
    { 'id': 'gn_PY', 'value': 'Guarani' },
    { 'id': 'ha_NG', 'value': 'Hausa' },
    { 'id': 'hr_HR', 'value': 'Hrvatski' },
    { 'id': 'rw_RW', 'value': 'Ikinyarwanda' },
    { 'id': 'is_IS', 'value': 'Íslenska' },
    { 'id': 'it_IT', 'value': 'Italiano' },
    { 'id': 'sw_KE', 'value': 'Kiswahili' },
    { 'id': 'ku_TR', 'value': 'Kurdî (Kurmancî)' },
    { 'id': 'lv_LV', 'value': 'Latviešu' },
    { 'id': 'fb_LT', 'value': 'Leet Speak' },
    { 'id': 'lt_LT', 'value': 'Lietuvių' },
    { 'id': 'la_VA', 'value': 'lingua latina' },
    { 'id': 'hu_HU', 'value': 'Magyar' },
    { 'id': 'mg_MG', 'value': 'Malagasy' },
    { 'id': 'mt_MT', 'value': 'Malti' },
    { 'id': 'nl_NL', 'value': 'Nederlands' },
    { 'id': 'nl_BE', 'value': 'Nederlands (België)' },
    { 'id': 'nb_NO', 'value': 'Norsk (bokmål)' },
    { 'id': 'nn_NO', 'value': 'Norsk (nynorsk)' },
    { 'id': 'uz_UZ', 'value': 'O\'zbek' },
    { 'id': 'pl_PL', 'value': 'Polski' },
    { 'id': 'pt_BR', 'value': 'Português (Brasil)' },
    { 'id': 'pt_PT', 'value': 'Português (Portugal)' },
    { 'id': 'ff_NG', 'value': 'Pulaar' },
    { 'id': 'ro_RO', 'value': 'Română' },
    { 'id': 'sc_IT', 'value': 'Sardu' },
    { 'id': 'sq_AL', 'value': 'Shqip' },
    { 'id': 'sz_PL', 'value': 'ślōnskŏ gŏdka' },
    { 'id': 'sk_SK', 'value': 'Slovenčina' },
    { 'id': 'sl_SI', 'value': 'Slovenščina' },
    { 'id': 'fi_FI', 'value': 'Suomi' },
    { 'id': 'sv_SE', 'value': 'Svenska' },
    { 'id': 'vi_VN', 'value': 'Tiếng Việt' },
    { 'id': 'tr_TR', 'value': 'Türkçe' }];

    return _.orderBy(languages, ['value'], ['asc']);
  }
}



