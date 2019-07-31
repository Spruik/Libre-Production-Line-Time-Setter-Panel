import * as utils from './utils'
import * as postgres from './postgresHelper'

export class TimeSetterCtrl {

  /** @ngInject */
  constructor(ctrl, data) {
    this.panelCtrl = ctrl;
    this.panelCtrl.productionLine = data
    this.panelCtrl.submit = this.submit()
    this.panelCtrl.initTimer = this.tryInitForm()
  }

  showForm(){   
    utils.showModal('setter_form.html', this.panelCtrl)
    this.panelCtrl.tryCount = 1
  }

  tryInitForm(){
    setTimeout(() => {
      try{
        this.startInitForm()
      }catch(e){
        if (this.panelCtrl.tryCount < 15) {
          this.panelCtrl.tryCount ++
          this.tryInitForm()
        }else {
          this.closeForm()
          utils.alert('error', 'Error', 'Form initialisation failed due to "' + e + '", please try agian')
        }
      }
    }, 200);
  }

  startInitForm(){
    $('#start-time-picker').timepicker({
      showMeridian: false,
      showSeconds: true,
      maxHours: 24,
      minuteStep: 1,
      secondStep: 1,
      defaultTime: this.panelCtrl.productionLine.start_time || '6:00:00',
      icons: {
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down'
      }
    })
  }

  closeForm(){
    $('#prodLine-ts-form-close-btn').trigger('click')
  }
  
  submit(){
    return () => {
      const site = this.panelCtrl.productionLine.site
      const area = this.panelCtrl.productionLine.area
      const line = this.panelCtrl.productionLine.production_line
      const time = this.panelCtrl.productionLine.start_time

      if (!this.isTimeValid(time)){
        utils.alert('warning', 'Time Format Invalid', 'The Time Format is invvalid, please enter a valid time Format h:mm:ss')
        return
      }

      const url = postgres.getUrl(this.panelCtrl.productionLine)
      const query = postgres.getQuery(time)

      utils.update(url, query).then(res => {
        this.closeForm()
        utils.alert('success', 'Successful', 'The start time for ' + site + ' | ' + area + ' | ' + line + ' has been set to ' + time)
        this.panelCtrl.timeSrv.refreshDashboard()
      }).catch(e => {
        this.closeForm()
        utils.alert('error', 'Error', 'Start time update failed due to "' + e + '", please try agian')
        this.panelCtrl.timeSrv.refreshDashboard()
      })
    }
  }

  isTimeValid(time) {
    if(time === '') { return false }
    const items = time.split(':')
    if (items.length !== 3) { return false }
    return true
  }
}