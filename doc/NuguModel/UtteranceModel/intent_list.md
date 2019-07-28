#Naming_Rule   
  - prefiex_default : 'MYDOC.INTENT.' + {'intent_verb' || 'intent_object'}   

#Intent_List   
1. MYDOC.INTENT.diagnosis
  - MYDOC.INTENT.diagnosis.all
  - MYDOC.INTENT.diagnosis.bodyparts
  - MYDOC.INTENT.diagnosis.disease
  - MYDOC.INTENT.diagnosis.default
    - re_act.diagnosis.bodyparts
    - re_act.diagnosis.disease

2. MYDOC.INTENT.search
  - MYDOC.INTENT.search.all
  - MYDOC.INTENT.search.bodyparts
  - MYDOC.INTENT.search.disease
  - MYDOC.INTENT.search.default
    - re_act.search.disease
    - re_act.search.bodyparts

3. MYDOC.INTENT.history
  - MYDOC.INTENT.history.all
  - MYDOC.INTENT.history.bodyparts
  - MYDOC.INTENT.history.disease
  - MYDOC.INTENT.history.default

4. MYDOC.INTENT.prevent
  - MYDOC.INTENT.prevent.taping
  - MYDOC.INTENT.prevent.stretch
  - MYDOC.INTENT.prevent.default
    - re_act.prevent.taping
    - re_act.prevent.stretch
